import { Test, TestingModule } from '@nestjs/testing';
import { CashOutFlowService } from './cash_out_flow.service';

describe('CashOutFlowService', () => {
  let service: CashOutFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashOutFlowService],
    }).compile();

    service = module.get<CashOutFlowService>(CashOutFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
