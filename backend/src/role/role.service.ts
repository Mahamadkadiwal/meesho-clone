import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './model/role.model';
import { UpdateRoleDto } from './dto/udpate-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return this.roleModel.find().exec();
  }

  async findOne(id: string) {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const updated = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Role not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.roleModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Role not found');
    return { message: 'Role deleted successfully' };
  }

  async findByRole(name: string) {
    const role = await this.roleModel.findOne({
      name,
    });

    return role;
  }
}
