import { Module } from '@nestjs/common';
import { StrategyBriefingService } from './strategy_briefing.service';
import { StrategyBriefingController } from './strategy_briefing.controller';

@Module({
  controllers: [StrategyBriefingController],
  providers: [StrategyBriefingService]
})
export class StrategyBriefingModule {}
