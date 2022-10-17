import { Module } from '@nestjs/common';
import { TicketListController } from './ticket_list.controller';
import { TicketListService } from './ticket_list.service';

@Module({
  controllers: [TicketListController],
  providers: [TicketListService]
})
export class TicketListModule {}
