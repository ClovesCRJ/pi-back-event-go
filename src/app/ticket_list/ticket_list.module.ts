import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { TicketItemModule } from '../ticket_item/ticket_item.module';
import { TicketList } from './entities/ticket_list.entity';
import { TicketListController } from './ticket_list.controller';
import { TicketListService } from './ticket_list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketList]),
    EventModule,
  ],
  exports: [TicketListService],
  controllers: [TicketListController],
  providers: [TicketListService],
})
export class TicketListModule {}
