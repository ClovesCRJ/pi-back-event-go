import { Module } from '@nestjs/common';
import { TicketRevenueService } from './ticket_revenue.service';
import { TicketRevenueController } from './ticket_revenue.controller';

@Module({
  controllers: [TicketRevenueController],
  providers: [TicketRevenueService]
})
export class TicketRevenueModule {}
