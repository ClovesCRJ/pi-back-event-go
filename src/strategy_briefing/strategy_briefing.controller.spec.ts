import { Test, TestingModule } from '@nestjs/testing';
import { StrategyBriefingController } from './strategy_briefing.controller';
import { StrategyBriefingService } from './strategy_briefing.service';

describe('StrategyBriefingController', () => {
  let controller: StrategyBriefingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrategyBriefingController],
      providers: [StrategyBriefingService],
    }).compile();

    controller = module.get<StrategyBriefingController>(StrategyBriefingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
