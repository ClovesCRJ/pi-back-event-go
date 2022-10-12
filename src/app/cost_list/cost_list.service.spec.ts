import { Test, TestingModule } from '@nestjs/testing';
import { CostListService } from './cost_list.service';

describe('CostListService', () => {
  let service: CostListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostListService],
    }).compile();

    service = module.get<CostListService>(CostListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
