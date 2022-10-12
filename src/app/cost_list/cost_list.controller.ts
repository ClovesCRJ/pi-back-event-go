import { Controller } from '@nestjs/common';
import { CostListService } from './cost_list.service';

@Controller('cost-list')
export class CostListController {
  constructor(private readonly costListService: CostListService) {}
}
