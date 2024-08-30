import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  faculty: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Assignment' }] })
  assignments: Types.Array<Types.ObjectId>;

  @Prop()
  year: number;

  @Prop()
  branch: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index({ code: 1 });
