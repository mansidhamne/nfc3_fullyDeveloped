// src/attendance/attendance.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { User } from 'src/schema/user.schema';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop({ required: true })
  email: string;

  @Prop({requied: true})
  id: number;

  @Prop({ required: true, type: Date, default: Date.now })
  date: Date;

  @Prop({ required: true,type:String,enum:['TOC','SE','ITL'],default:'TOC'})
  subject: string;

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

  @Prop()
  lecture_time:string;
  @Prop()
  attendance_time:string;
  @Prop({ type: String, enum: ['Present', 'Absent'], default: 'Absent' })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
