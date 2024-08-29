import { Controller, Patch, Body, Param } from '@nestjs/common';
import { AuxService } from './auxi.service'; // Import the service

@Controller('aux')
export class AuxController {
  constructor(private readonly auxService: AuxService) {}

  @Patch(':courseId')
  async updateAux(
    @Param('courseId') courseId: string,
    @Body('geo_latitude') geo_latitude: number,
    @Body('geo_longitude') geo_longitude: number,
  ) {
    return this.auxService.updateAux(courseId, geo_latitude, geo_longitude);
  }
}

