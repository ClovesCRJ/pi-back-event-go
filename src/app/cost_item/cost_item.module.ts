import { forwardRef, Module } from '@nestjs/common';
import { CostItemService } from './cost_item.service';
import { CostItemController } from './cost_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostItem } from './entities/cost_item.entity';
import { EventModule } from '../event/event.module';
import { CostListModule } from '../cost_list/cost_list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostItem]),
    EventModule,
    forwardRef(() => CostListModule),
  ],
  controllers: [CostItemController],
  providers: [CostItemService],
  exports: [CostItemService],
})
export class CostItemModule {}
