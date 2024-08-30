import { Controller, Post, Body } from '@nestjs/common';
import { StudyGptService } from './study-gpt.service';

@Controller('api/study-gpt')
export class StudyGptController {
  constructor(private readonly studyGptService: StudyGptService) {}

  @Post('suggestions')
  async getSuggestions(@Body() body: { prompt: string }) {
    return this.studyGptService.getStudySuggestions(body.prompt);
  }
}
