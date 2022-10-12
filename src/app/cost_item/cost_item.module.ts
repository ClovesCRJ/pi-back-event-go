import { Module } from '@nestjs/common';
import { CostItemService } from './cost_item.service';
import { CostItemController } from './cost_item.controller';

@Module({
  controllers: [CostItemController],
  providers: [CostItemService]
})
export class CostItemModule {}
