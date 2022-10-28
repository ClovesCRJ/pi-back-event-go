import { forwardRef, Module } from '@nestjs/common';
import { CostListService } from './cost_list.service';
import { CostListController } from './cost_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostList } from './entities/cost_list.entity';
import { EventModule } from '../event/event.module';
import { CostItemModule } from '../cost_item/cost_item.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostList]),
    EventModule,
    UserPermissionModule,
  ],
  exports: [CostListService],
  controllers: [CostListController],
  providers: [CostListService]
})
export class CostListModule {}
