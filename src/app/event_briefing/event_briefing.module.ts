import { forwardRef, Module } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { EventBriefingController } from './event_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBriefing } from './entities/event_briefing.entity';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventBriefing]),
    forwardRef(() => EventModule),
    UserPermissionModule,
  ],
  exports: [EventBriefingService],
  controllers: [EventBriefingController],
  providers: [EventBriefingService]
})
export class EventBriefingModule {}
