import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema()
export class Teacher extends User {
  @Prop({ required: true, unique: true })
  teacherId: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);