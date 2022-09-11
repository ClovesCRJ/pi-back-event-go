import { Test, TestingModule } from '@nestjs/testing';
import { CostItemService } from './cost_item.service';

describe('CostItemService', () => {
  let service: CostItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostItemService],
    }).compile();

    service = module.get<CostItemService>(CostItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
