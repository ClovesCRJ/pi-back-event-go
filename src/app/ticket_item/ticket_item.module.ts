import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { TicketListModule } from '../ticket_list/ticket_list.module';
import { TicketItem } from './entities/ticket_item.entity';
import { TicketItemController } from './ticket_item.controller';
import { TicketItemService } from './ticket_item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketItem]),
    EventModule,
    TicketListModule,
  ],
  exports: [TicketItemService],
  controllers: [TicketItemController],
  providers: [TicketItemService]
})
export class TicketItemModule {}
