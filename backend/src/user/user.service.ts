import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/register.dto';
import { RoleService } from 'src/role/role.service';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private roleService: RoleService,
  ) {}

  async findByIdToken(_id: Types.ObjectId, token: string) {
    await this.userModel.findByIdAndUpdate(_id, {
      refreshToken: token,
    });
  }

  async createUser(registerDto: RegisterUserDto) {
    try {
      const role = await this.roleService.findByRole('user');

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      const user = await this.userModel.create({
        ...registerDto,
        roleId: role._id,
      });

      return {
        _id: user._id,
        email: user.email,
        username: user.username,
        roleName: role.name,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).populate('roleId').lean();
  }

  async findUserbyId(id: string) {
    return this.userModel.findById(id).populate('roleId').lean();
  }

  async logout(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.refreshToken = null;
    await user.save();
    return { message: 'Logout Successfully' };
  }
}
