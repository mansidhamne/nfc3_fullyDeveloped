import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema()
export class Student extends User {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  branch: string;

  @Prop()
  image: string;

  @Prop()
  leetcodeProfileUrl: string;

  @Prop()
  githubProfileUrl: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);