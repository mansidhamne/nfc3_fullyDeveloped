import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment, AssignmentDocument } from './schemas/assignment.schema';
import { Course, CourseDocument } from '../courses/schemas/course.schema';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: Model<AssignmentDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    // private readonly mailgunService: MailgunService,
  ) {}

  async createAssignment(createAssignmentDto: any): Promise<Assignment> {
    const createdAssignment = new this.assignmentModel(createAssignmentDto);
    await createdAssignment.save();

    // Update the course to include this assignment
    const course = await this.courseModel
      .findById(createAssignmentDto.course)
      .exec();
    if (course) {
      course.assignments.push(createdAssignment._id);
      await course.save();
    }

    return createdAssignment;
  }

  async findAllAssignments(): Promise<Assignment[]> {
    return this.assignmentModel.find().exec();
  }

  async findAssignmentById(id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(id).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  async updateAssignment(
    id: string,
    updateAssignmentDto: any,
  ): Promise<Assignment> {
    const updatedAssignment = await this.assignmentModel
      .findByIdAndUpdate(id, updateAssignmentDto, { new: true })
      .exec();
    if (!updatedAssignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return updatedAssignment;
  }

  // async submitAssignment(
  //   userId: string,
  //   email: string,
  //   file: string,
  // ): Promise<any> {
  //   // Logic to save the file, probably using AWS S3, or another storage service
  //   // This is just a placeholder for the file saving logic

  //   // Send email notification
  //   const subject = 'Document Uploaded';
  //   const content = 'Your document has been successfully uploaded.';
  //   await this.mailgunService.sendEmail(email, subject, content);

  //   // Record submission in the database (pseudo code)
  //   // await this.recordSubmission(userId, email);

  //   return {
  //     message: 'Assignment submitted successfully and email notification sent!',
  //   };
}
