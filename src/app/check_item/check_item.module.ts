import { forwardRef, Module } from '@nestjs/common';
import { CheckItemService } from './check_item.service';
import { CheckItemController } from './check_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckItem } from './entities/check_item.entity';
import { EventModule } from '../event/event.module';
import { CheckListModule } from '../check_list/check_list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckItem]),
    EventModule,
    CheckListModule,
  ],
  exports: [CheckItemService],
  controllers: [CheckItemController],
  providers: [CheckItemService]
})
export class CheckItemModule {}
