// src/attendance/attendance.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  async markAttendance(@Body() body: { email: string; latitude: number; longitude: number }) {
    try {
      const { email, latitude, longitude } = body;
      const result = await this.attendanceService.markAttendance(email, latitude, longitude);
      return { message: 'Attendance marked successfully', result };
    } catch (error) {
      return { message: error.message };
    }
  }
}
