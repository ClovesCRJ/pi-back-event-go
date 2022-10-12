import { Module } from '@nestjs/common';
import { TicketRevenueListService } from './ticket_revenue_list.service';
import { TicketRevenueListController } from './ticket_revenue_list.controller';

@Module({
  controllers: [TicketRevenueListController],
  providers: [TicketRevenueListService]
})
export class TicketRevenueListModule {}
