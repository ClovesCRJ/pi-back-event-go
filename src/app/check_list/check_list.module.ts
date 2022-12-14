import { forwardRef, Module } from '@nestjs/common';
import { CheckListService } from './check_list.service';
import { CheckListController } from './check_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/check_list.entity';
import { EventModule } from '../event/event.module';
import { CheckItemModule } from '../check_item/check_item.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckList]),
    EventModule,
    UserPermissionModule,
  ],
  controllers: [CheckListController],
  providers: [CheckListService],
  exports: [CheckListService],
})
export class CheckListModule {}
