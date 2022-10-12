import { Module } from '@nestjs/common';
import { PromotionBriefingService } from './promotion_briefing.service';
import { PromotionBriefingController } from './promotion_briefing.controller';

@Module({
  controllers: [PromotionBriefingController],
  providers: [PromotionBriefingService]
})
export class PromotionBriefingModule {}
