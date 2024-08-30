import { Module } from '@nestjs/common';
import { StudyGptService } from './study-gpt.service';
import { StudyGptController } from './study-gpt.controller';

@Module({
  providers: [StudyGptService],
  controllers: [StudyGptController],
})
export class StudyGptModule {}
