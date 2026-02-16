import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/role/model/role.model';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  roleId!: Role | mongoose.Types.ObjectId;

  @Prop({ type: String, default: null })
  refreshToken?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
