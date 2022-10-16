import { Test, TestingModule } from '@nestjs/testing';
import { CashOutFlowController } from './cash_out_flow.controller';

describe('CashOutFlowController', () => {
  let controller: CashOutFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashOutFlowController],
    }).compile();

    controller = module.get<CashOutFlowController>(CashOutFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
