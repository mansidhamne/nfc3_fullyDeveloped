import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { MailgunService } from '../common/mailgun.service';
import { Assignment, AssignmentSchema } from './schemas/assignment.schema';
import { CourseSchema } from 'src/courses/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService, MailgunService],
})
export class AssignmentModule {}
