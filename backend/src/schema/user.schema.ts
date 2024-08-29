import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ discriminatorKey: 'role' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['student', 'teacher'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// Optionally, create indexes for the schema (if needed for optimization or uniqueness)
UserSchema.index({ email: 1 }, { unique: true });  // Ensure unique emails