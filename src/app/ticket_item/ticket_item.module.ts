import { Module } from '@nestjs/common';
import { TicketItemController } from './ticket_item.controller';
import { TicketItemService } from './ticket_item.service';

@Module({
  controllers: [TicketItemController],
  providers: [TicketItemService]
})
export class TicketItemModule {}
