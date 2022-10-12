import { Test, TestingModule } from '@nestjs/testing';
import { MarketingBriefingController } from './marketing_briefing.controller';
import { MarketingBriefingService } from './marketing_briefing.service';

describe('MarketingBriefingController', () => {
  let controller: MarketingBriefingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketingBriefingController],
      providers: [MarketingBriefingService],
    }).compile();

    controller = module.get<MarketingBriefingController>(MarketingBriefingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
