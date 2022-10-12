import { Module } from '@nestjs/common';
import { MarketingBriefingService } from './marketing_briefing.service';
import { MarketingBriefingController } from './marketing_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingBriefing } from './entities/marketing_briefing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketingBriefing])],
  exports: [MarketingBriefingService],
  controllers: [MarketingBriefingController],
  providers: [MarketingBriefingService]
})
export class MarketingBriefingModule {}
