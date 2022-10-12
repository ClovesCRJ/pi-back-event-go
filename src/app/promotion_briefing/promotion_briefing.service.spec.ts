import { Test, TestingModule } from '@nestjs/testing';
import { PromotionBriefingService } from './promotion_briefing.service';

describe('PromotionBriefingService', () => {
  let service: PromotionBriefingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionBriefingService],
    }).compile();

    service = module.get<PromotionBriefingService>(PromotionBriefingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
