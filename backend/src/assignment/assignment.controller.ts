import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './schemas/assignment.schema';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  // Create a new assignment
  @Post()
  async create(@Body() createAssignmentDto: any): Promise<Assignment> {
    return this.assignmentService.createAssignment(createAssignmentDto);
  }

  // List all assignments
  @Get()
  async findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAllAssignments();
  }

  // Get an assignment by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Assignment> {
    try {
      return await this.assignmentService.findAssignmentById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Update an assignment by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: any,
  ): Promise<Assignment> {
    try {
      return await this.assignmentService.updateAssignment(
        id,
        updateAssignmentDto,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // @Post('submit')
  // async submitAssignment(@Body() body: any): Promise<any> {
  //   const { userId, email, file } = body;
  //   return this.assignmentService.submitAssignment(userId, email, file);
  // }
}
