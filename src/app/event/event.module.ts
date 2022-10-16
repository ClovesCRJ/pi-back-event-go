import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { BriefingModule } from '../briefing/briefing.module';
import { EventBriefingModule } from '../event_briefing/event_briefing.module';
import { MarketingBriefingModule } from '../marketing_briefing/marketing_briefing.module';
import { PromotionBriefingModule } from '../promotion_briefing/promotion_briefing.module';
import { PublicBriefingModule } from '../public_briefing/public_briefing.module';
import { StrategyBriefingModule } from '../strategy_briefing/strategy_briefing.module';

@Module({
  // TODO: Includes Removal of CheckList, CostLIst, TIcketRevenuesList, EventRevenues, CashInFlow and CashOutFlow.
  imports: [
    TypeOrmModule.forFeature([Event]),
    BriefingModule,
    EventBriefingModule,
    MarketingBriefingModule,
    PromotionBriefingModule,
    PublicBriefingModule,
    StrategyBriefingModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
