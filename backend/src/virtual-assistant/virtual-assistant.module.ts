import { Module } from '@nestjs/common';
import { VirtualAssistantService } from './virtual-assistant.service';
import { VirtualAssistantController } from './virtual-assistant.controller';

@Module({
  providers: [VirtualAssistantService],
  controllers: [VirtualAssistantController],
})
export class VirtualAssistantModule {}
