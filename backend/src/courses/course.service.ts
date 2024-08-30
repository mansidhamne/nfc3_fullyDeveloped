import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  // Create a new course
  async createCourse(createCourseDto: Partial<Course>): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  // List all courses
  async findAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Find a course by ID
  async findByCode(code: string): Promise<Course> {
    const course = await this.courseModel.findOne({ code }).exec();
    if (!course) {
      throw new NotFoundException(`Course with code "${code}" not found`);
    }
    return course;
  }

  async findCourseById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async findById(id: string): Promise<Course> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid course ID');
    }
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
    return course;
  }
  // Update a course by ID
  async updateCourse(
    id: string,
    updateCourseDto: Partial<Course>,
  ): Promise<Course> {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }
}
