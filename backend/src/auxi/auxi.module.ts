// src/aux/aux.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuxService } from './auxi.service';
import { AuxController } from './auxi.controller';
import { Aux, AuxSchema } from './schemas/auxi.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aux.name, schema: AuxSchema }]), // Register Aux schema
  ],
  controllers: [AuxController], // Register AuxController
  providers: [AuxService], // Register AuxService
})
export class AuxModule {}
