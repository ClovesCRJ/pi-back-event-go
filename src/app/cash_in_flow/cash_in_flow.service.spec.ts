import { Test, TestingModule } from '@nestjs/testing';
import { CashInFlowService } from './cash_in_flow.service';

describe('CashInFlowService', () => {
  let service: CashInFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashInFlowService],
    }).compile();

    service = module.get<CashInFlowService>(CashInFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
