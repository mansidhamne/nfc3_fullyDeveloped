// src/attendance/attendance.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schemas/attendance.schema';  // Import the Attendance schema
import { User, UserSchema } from 'src/schema/user.schema';  // Import the User schema
import { AttendanceService } from './attendance.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attendance.name, schema: AttendanceSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Register the User schema
  ],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
