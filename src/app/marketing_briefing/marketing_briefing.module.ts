import { Module } from '@nestjs/common';
import { MarketingBriefingService } from './marketing_briefing.service';
import { MarketingBriefingController } from './marketing_briefing.controller';

@Module({
  controllers: [MarketingBriefingController],
  providers: [MarketingBriefingService]
})
export class MarketingBriefingModule {}
