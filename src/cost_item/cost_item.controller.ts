import { Controller } from '@nestjs/common';
import { CostItemService } from './cost_item.service';

@Controller('cost-item')
export class CostItemController {
  constructor(private readonly costItemService: CostItemService) {}
}
