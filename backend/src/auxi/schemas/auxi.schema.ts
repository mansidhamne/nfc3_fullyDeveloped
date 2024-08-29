import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Aux extends Document {
  @Prop({ required: true })
  id: string; // Course ID

  @Prop({ required: true, enum: [0, 1] })
  flag: number; // 0 or 1

  @Prop({ required: true })
  geo_latitude: number; // Latitude

  @Prop({ required: true })
  geo_longitude: number; // Longitude
  @Prop({
    type: Map,
    of: [{ uid: String, status: String }],
    default: {}
  })
  attendees: Map<string, { uid: string; status: string }[]>;

  @Prop({ type: Date, default: Date.now })
  date: Date;
}

export const AuxSchema = SchemaFactory.createForClass(Aux);
