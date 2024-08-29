import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aux } from './schemas/auxi.schema'; // Import the schema

@Injectable()
export class AuxService {
  constructor(@InjectModel(Aux.name) private readonly auxModel: Model<Aux>) {}
  async createAux(createAuxDto: { id: string; geo_latitude: number; geo_longitude: number }): Promise<Aux> {
    const newAux = new this.auxModel({
      ...createAuxDto,
      flag: 0, // Default value for flag
    });
    return newAux.save();
  }
  async getAllAux(): Promise<Aux[]> {
    return this.auxModel.find().exec(); // Retrieve all documents
  }
  async updateAux(courseId: string, geo_latitude: number, geo_longitude: number): Promise<Aux> {
    const updatedAux = await this.auxModel.findOneAndUpdate(
      { id: courseId },
      {
        $set: {
          flag: (geo_latitude > 0 && geo_longitude > 0) ? 1 : 0,
          geo_latitude: geo_latitude,
          geo_longitude: geo_longitude,
        },
      },
      { new: true }
    );

    if (!updatedAux) {
      throw new NotFoundException(`Aux record with Course ID ${courseId} not found`);
    }

    return updatedAux;
  }
  async updateAttendees(courseId: string, date: string, uid: string, status: string): Promise<Aux> {
    const updatedAux = await this.auxModel.findOneAndUpdate(
      { id: courseId },
      {
        $push: {
          [`attendees.${date}`]: { uid: uid, status: status }
        }
      },
      { new: true }
    );

    if (!updatedAux) {
      throw new NotFoundException(`Aux record with Course ID ${courseId} not found`);
    }

    return updatedAux;
  }
  async getAttendeesByDate(courseId: string, date: string): Promise<{ date: string; attendees: { uid: string; status: string }[] }> {
    const aux = await this.auxModel.findOne({ id: courseId }).exec();

    if (!aux) {
      throw new NotFoundException(`Aux record with Course ID ${courseId} not found`);
    }

    const attendees = aux.attendees.get(date) || [];

    return { date: date, attendees: attendees };
  }
  async getGeoLocationByCourseId(courseId: string): Promise<{ geo_latitude: number; geo_longitude: number }> {
    const aux = await this.auxModel.findOne({ id: courseId }).exec();
    if (!aux) {
      throw new NotFoundException(`Aux record with Course ID ${courseId} not found`);
    }
    return {
      geo_latitude: aux.geo_latitude,
      geo_longitude: aux.geo_longitude,
    };
  }
}
