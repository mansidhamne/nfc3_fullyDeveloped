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
}

export const AuxSchema = SchemaFactory.createForClass(Aux);
