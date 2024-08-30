// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './courses/course.module';
import { AssignmentModule } from './assignment/assignment.module';
import { VirtualAssistantModule } from './virtual-assistant/virtual-assistant.module';
import { StudyGptModule } from './study-gpt/study-gpt.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vivekagangwani:EPiUJaC7dSOhQDoR@cluster0.skc7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // Replace with your MongoDB connection string
    AuthModule,
    CourseModule,
    AssignmentModule,
    VirtualAssistantModule,
    StudyGptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
