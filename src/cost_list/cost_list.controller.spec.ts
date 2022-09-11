import { Test, TestingModule } from '@nestjs/testing';
import { CostListController } from './cost_list.controller';
import { CostListService } from './cost_list.service';

describe('CostListController', () => {
  let controller: CostListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostListController],
      providers: [CostListService],
    }).compile();

    controller = module.get<CostListController>(CostListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
