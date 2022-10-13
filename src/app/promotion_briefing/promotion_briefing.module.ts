import { forwardRef, Module } from '@nestjs/common';
import { PromotionBriefingService } from './promotion_briefing.service';
import { PromotionBriefingController } from './promotion_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionBriefing } from './entities/promotion_briefing.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionBriefing]),
    forwardRef(() => EventModule),
  ],
  exports: [PromotionBriefingService],
  controllers: [PromotionBriefingController],
  providers: [PromotionBriefingService]
})
export class PromotionBriefingModule {}
