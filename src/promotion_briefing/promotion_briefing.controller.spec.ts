import { Test, TestingModule } from '@nestjs/testing';
import { PromotionBriefingController } from './promotion_briefing.controller';
import { PromotionBriefingService } from './promotion_briefing.service';

describe('PromotionBriefingController', () => {
  let controller: PromotionBriefingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionBriefingController],
      providers: [PromotionBriefingService],
    }).compile();

    controller = module.get<PromotionBriefingController>(PromotionBriefingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
