// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {AttendanceModule} from './attendance/attendance.module';
import {AuxModule} from './auxi/auxi.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vivekagangwani:EPiUJaC7dSOhQDoR@cluster0.skc7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // Replace with your MongoDB connection string
    AuthModule,
    AttendanceModule,
    AuxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
