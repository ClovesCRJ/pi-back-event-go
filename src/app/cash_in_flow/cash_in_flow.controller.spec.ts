import { Test, TestingModule } from '@nestjs/testing';
import { CashInFlowController } from './cash_in_flow.controller';

describe('CashInFlowController', () => {
  let controller: CashInFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashInFlowController],
    }).compile();

    controller = module.get<CashInFlowController>(CashInFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
