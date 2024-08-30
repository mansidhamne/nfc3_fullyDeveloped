import { Controller, Patch, Body, Param, Post, Get } from '@nestjs/common';
import { AuxService } from './auxi.service'; // Import the service
import { Aux } from './schemas/auxi.schema'; // Import the schema

@Controller('aux')
export class AuxController {
  constructor(private readonly auxService: AuxService) {}
  @Post()
  async createAux(
    @Body()
    createAuxDto: {
      id: string;
      geo_latitude: number;
      geo_longitude: number;
    },
  ): Promise<Aux> {
    return this.auxService.createAux(createAuxDto);
  }
  @Get()
  async getAllAux(): Promise<Aux[]> {
    return this.auxService.getAllAux();
  }
  @Patch(':courseId/attendees')
  async updateAttendees(
    @Param('courseId') courseId: string,
    @Body() attendeeDto: { date: string; uid: string; status: string },
  ): Promise<Aux> {
    return this.auxService.updateAttendees(
      courseId,
      attendeeDto.date,
      attendeeDto.uid,
      attendeeDto.status,
    );
  }
  @Patch(':courseId')
  async updateAux(
    @Param('courseId') courseId: string,
    @Body('geo_latitude') geo_latitude: number,
    @Body('geo_longitude') geo_longitude: number,
  ) {
    return this.auxService.updateAux(courseId, geo_latitude, geo_longitude);
  }
  @Get(':courseId/attendees/:date')
  async getAttendeesByDate(
    @Param('courseId') courseId: string,
    @Param('date') date: string,
  ): Promise<{ date: string; attendees: { uid: string; status: string }[] }> {
    return this.auxService.getAttendeesByDate(courseId, date);
  }
  @Get(':courseId/geo-location')
  async getGeoLocationByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<{ geo_latitude: number; geo_longitude: number }> {
    return this.auxService.getGeoLocationByCourseId(courseId);
  }
  @Get(':courseId/flag')
  async getFlagByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<{ flag: number }> {
    const flag = await this.auxService.getFlagByCourseId(courseId);
    return { flag };
  }
}
