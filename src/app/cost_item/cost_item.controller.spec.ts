import { Test, TestingModule } from '@nestjs/testing';
import { CostItemController } from './cost_item.controller';
import { CostItemService } from './cost_item.service';

describe('CostItemController', () => {
  let controller: CostItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostItemController],
      providers: [CostItemService],
    }).compile();

    controller = module.get<CostItemController>(CostItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
