import { Module } from '@nestjs/common';
import { CostListService } from './cost_list.service';
import { CostListController } from './cost_list.controller';

@Module({
  controllers: [CostListController],
  providers: [CostListService]
})
export class CostListModule {}
