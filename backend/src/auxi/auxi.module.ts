import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuxService } from './auxi.service';
import { AuxController } from './auxi.controller';
import { Aux, AuxSchema } from './schemas/auxi.schema';
import { Student, StudentSchema } from '../schema/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aux.name, schema: AuxSchema },
      { name: Student.name, schema: StudentSchema }
    ]),
  ],
  controllers: [AuxController],
  providers: [AuxService],
  exports: [AuxService],
})
export class AuxModule {}