import { Module } from '@nestjs/common';
import { StrategyBriefingService } from './strategy_briefing.service';
import { StrategyBriefingController } from './strategy_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrategyBriefing } from './entities/strategy_briefing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StrategyBriefing])],
  exports: [StrategyBriefingService],
  controllers: [StrategyBriefingController],
  providers: [StrategyBriefingService]
})
export class StrategyBriefingModule {}
