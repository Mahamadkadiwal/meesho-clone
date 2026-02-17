import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models/category.model';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = this.generateSlug(createCategoryDto.name);

    return await this.categoryModel.create({
      ...createCategoryDto,
      slug,
    });
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findById(id, {
      where: {
        isActive: true,
      },
    });

    if (category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateData: UpdateCategoryDto & { slug?: string } = {
      ...updateCategoryDto,
    };

    if (updateData.name) {
      updateData.slug = this.generateSlug(updateData.name);
    }

    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}
