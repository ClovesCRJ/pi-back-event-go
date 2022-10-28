import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingItemModule } from '../booking_item/booking_item.module';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';
import { BookingListController } from './booking_list.controller';
import { BookingListService } from './booking_list.service';
import { BookingList } from './entities/booking_list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingList]),
    EventModule,
    UserPermissionModule,
  ],
  exports: [BookingListService],
  controllers: [BookingListController],
  providers: [BookingListService]
})
export class BookingListModule {}
