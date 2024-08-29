// src/attendance/attendance.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  // @Prop({ required: true })
  // email: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })  // Reference to User schema
  user: Types.ObjectId;  // Reference field

  @Prop({ required: true, type: Date, default: Date.now })
  date: Date;

  @Prop({
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  })
  location: {
    latitude: number;
    longitude: number;
  };

  @Prop({ type: String, enum: ['Present', 'Absent'], default: 'Absent' })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
