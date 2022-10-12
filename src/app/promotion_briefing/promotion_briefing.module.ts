import { Module } from '@nestjs/common';
import { PromotionBriefingService } from './promotion_briefing.service';
import { PromotionBriefingController } from './promotion_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionBriefing } from './entities/promotion_briefing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionBriefing])],
  exports: [PromotionBriefingService],
  controllers: [PromotionBriefingController],
  providers: [PromotionBriefingService]
})
export class PromotionBriefingModule {}
