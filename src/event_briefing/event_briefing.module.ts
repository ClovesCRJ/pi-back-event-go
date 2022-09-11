import { Module } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { EventBriefingController } from './event_briefing.controller';

@Module({
  controllers: [EventBriefingController],
  providers: [EventBriefingService]
})
export class EventBriefingModule {}
