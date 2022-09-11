import { Module } from '@nestjs/common';
import { EventRevenueService } from './event_revenue.service';
import { EventRevenueController } from './event_revenue.controller';

@Module({
  controllers: [EventRevenueController],
  providers: [EventRevenueService]
})
export class EventRevenueModule {}
