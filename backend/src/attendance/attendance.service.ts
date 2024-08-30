import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async create(attendanceData: Partial<Attendance>): Promise<Attendance> {
    const createdAttendance = new this.attendanceModel(attendanceData);
    return createdAttendance.save();
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().exec();
  }

  async findByEmail(email: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ email }).exec();
  }

  async updateStatus(id: number, status: string): Promise<Attendance> {
    return this.attendanceModel.findOneAndUpdate({ id }, { status }, { new: true }).exec();
  }
}