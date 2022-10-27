import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingListModule } from '../booking_list/booking_list.module';
import { EventModule } from '../event/event.module';
import { BookingItemController } from './booking_item.controller';
import { BookingItemService } from './booking_item.service';
import { BookingItem } from './entities/booking_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingItem]),
    EventModule,
    BookingListModule,
  ],
  exports: [BookingItemService],
  controllers: [BookingItemController],
  providers: [BookingItemService]
})
export class BookingItemModule {}
