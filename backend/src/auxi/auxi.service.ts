import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aux } from './schemas/auxi.schema'; // Import the schema

@Injectable()
export class AuxService {
  constructor(@InjectModel(Aux.name) private readonly auxModel: Model<Aux>) {}

  async updateAux(courseId: string, geo_latitude: number, geo_longitude: number): Promise<Aux> {
    const updatedAux = await this.auxModel.findOneAndUpdate(
      { id: courseId },
      {
        $set: {
          flag: 1,
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
}
