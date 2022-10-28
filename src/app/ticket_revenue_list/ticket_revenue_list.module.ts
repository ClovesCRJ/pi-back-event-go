import { forwardRef, Module } from '@nestjs/common';
import { TicketRevenueListService } from './ticket_revenue_list.service';
import { TicketRevenueListController } from './ticket_revenue_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRevenueList } from './entities/ticket_revenue_list.entity';
import { EventModule } from '../event/event.module';
import { TicketRevenueModule } from '../ticket_revenue/ticket_revenue.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRevenueList]),
    EventModule,
    UserPermissionModule,
  ],
  controllers: [TicketRevenueListController],
  providers: [TicketRevenueListService],
  exports: [TicketRevenueListService],
})
export class TicketRevenueListModule {}
