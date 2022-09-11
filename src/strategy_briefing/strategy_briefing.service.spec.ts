import { Test, TestingModule } from '@nestjs/testing';
import { StrategyBriefingService } from './strategy_briefing.service';

describe('StrategyBriefingService', () => {
  let service: StrategyBriefingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrategyBriefingService],
    }).compile();

    service = module.get<StrategyBriefingService>(StrategyBriefingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
