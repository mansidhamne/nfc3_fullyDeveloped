import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AssignmentService } from 'src/assignment/assignment.service';
import { AssignmentController } from 'src/assignment/assignment.controller';
import {
  Assignment,
  AssignmentSchema,
} from 'src/assignment/schemas/assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
    ]),
  ],
  providers: [CourseService, AssignmentService],
  controllers: [CourseController, AssignmentController],
})
export class CourseModule {}
