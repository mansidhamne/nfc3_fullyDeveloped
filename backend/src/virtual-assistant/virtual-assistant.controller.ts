import { Controller, Post, Body } from '@nestjs/common';
import { VirtualAssistantService } from './virtual-assistant.service';

@Controller('virtual-assistant')
export class VirtualAssistantController {
  constructor(
    private readonly virtualAssistantService: VirtualAssistantService,
  ) {}

  @Post('suggestions')
  async getSuggestions(@Body() body: { prompt: string }) {
    return this.virtualAssistantService.getStudySuggestions(body.prompt);
  }
}
