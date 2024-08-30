import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schemas/attendance.schema';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() attendanceData: Partial<Attendance>): Promise<Attendance> {
    return this.attendanceService.create(attendanceData);
  }

  @Get()
  async findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<Attendance[]> {
    return this.attendanceService.findByEmail(email);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Attendance> {
    return this.attendanceService.updateStatus(id, status);
  }
}