import { Controller, Patch, Body, Param,Post,Get} from '@nestjs/common';
import { AuxService } from './auxi.service'; // Import the service
import { Aux } from './schemas/auxi.schema'; // Import the schema

@Controller('aux')
export class AuxController {
  constructor(private readonly auxService: AuxService) {}
  @Post()
  async createAux(
    @Body() createAuxDto: { id: string; geo_latitude: number; geo_longitude: number }
  ): Promise<Aux> {
    return this.auxService.createAux(createAuxDto);
  }
  @Get()
  async getAllAux(): Promise<Aux[]> {
    return this.auxService.getAllAux();
  }
  @Patch(':courseId')
  async updateAux(
    @Param('courseId') courseId: string,
    @Body('geo_latitude') geo_latitude: number,
    @Body('geo_longitude') geo_longitude: number,
  ) {
    return this.auxService.updateAux(courseId, geo_latitude, geo_longitude);
  }
}

