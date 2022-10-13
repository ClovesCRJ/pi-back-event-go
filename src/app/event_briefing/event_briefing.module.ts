import { forwardRef, Module } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { EventBriefingController } from './event_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBriefing } from './entities/event_briefing.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventBriefing]),
    forwardRef(() => EventModule),
  ],
  exports: [EventBriefingService],
  controllers: [EventBriefingController],
  providers: [EventBriefingService]
})
export class EventBriefingModule {}
