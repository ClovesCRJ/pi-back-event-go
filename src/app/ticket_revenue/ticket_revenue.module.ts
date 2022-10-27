import { forwardRef, Module } from '@nestjs/common';
import { TicketRevenueService } from './ticket_revenue.service';
import { TicketRevenueController } from './ticket_revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRevenue } from './entities/ticket_revenue.entity';
import { EventModule } from '../event/event.module';
import { TicketRevenueListModule } from '../ticket_revenue_list/ticket_revenue_list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRevenue]),
    EventModule,
    TicketRevenueListModule,
  ],
  controllers: [TicketRevenueController],
  providers: [TicketRevenueService],
  exports: [TicketRevenueService],
})
export class TicketRevenueModule {}
