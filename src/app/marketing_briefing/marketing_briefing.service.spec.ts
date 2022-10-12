import { Test, TestingModule } from '@nestjs/testing';
import { MarketingBriefingService } from './marketing_briefing.service';

describe('MarketingBriefingService', () => {
  let service: MarketingBriefingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketingBriefingService],
    }).compile();

    service = module.get<MarketingBriefingService>(MarketingBriefingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
