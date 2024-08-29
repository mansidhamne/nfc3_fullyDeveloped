import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from 'src/courses/schemas/course.schema';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ type: { type: Types.ObjectId, ref: 'Course' } })
  course: Types.ObjectId; // Reference to the course to which the assignment belongs

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  submissions: Types.Array<Types.ObjectId>; // Students who have submitted the assignment
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
