import { forwardRef, Module } from '@nestjs/common';
import { MarketingBriefingService } from './marketing_briefing.service';
import { MarketingBriefingController } from './marketing_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingBriefing } from './entities/marketing_briefing.entity';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarketingBriefing]),
    forwardRef(() => EventModule),
    UserPermissionModule,
  ],
  exports: [MarketingBriefingService],
  controllers: [MarketingBriefingController],
  providers: [MarketingBriefingService]
})
export class MarketingBriefingModule {}
