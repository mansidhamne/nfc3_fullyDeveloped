import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vivekagangwani:EPiUJaC7dSOhQDoR@cluster0.skc7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // Replace with your MongoDB connection string
    AuthModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
