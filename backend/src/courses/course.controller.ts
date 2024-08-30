import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: Partial<Course>): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAllCourses();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    try {
      return await this.courseService.findCourseById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Update a course by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: Partial<Course>,
  ): Promise<Course> {
    try {
      return await this.courseService.updateCourse(id, updateCourseDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
