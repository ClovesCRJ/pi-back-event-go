import { Module } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { EventBriefingController } from './event_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBriefing } from './entities/event_briefing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventBriefing])],
  exports: [EventBriefingService],
  controllers: [EventBriefingController],
  providers: [EventBriefingService]
})
export class EventBriefingModule {}
