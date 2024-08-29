// src/attendance/attendance.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  private GEO_FENCE_CENTER = { latitude: 40.748817, longitude: -73.985428 }; // Example coordinates
  private GEO_FENCE_RADIUS = 0.5; // 0.5 km radius

  private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  async markAttendance(email: string, latitude: number, longitude: number): Promise<any> {
    const distance = this.getDistanceFromLatLonInKm(
      latitude,
      longitude,
      this.GEO_FENCE_CENTER.latitude,
      this.GEO_FENCE_CENTER.longitude,
    );

    if (distance <= this.GEO_FENCE_RADIUS) {
      const attendance = new this.attendanceModel({
        email,
        location: { latitude, longitude },
        status: 'Present',
      });
      return await attendance.save();
    } else {
      throw new Error('You are not within the allowed geofenced area');
    }
  }
}
