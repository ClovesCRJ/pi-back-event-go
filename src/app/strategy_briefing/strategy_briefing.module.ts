import { forwardRef, Module } from '@nestjs/common';
import { StrategyBriefingService } from './strategy_briefing.service';
import { StrategyBriefingController } from './strategy_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrategyBriefing } from './entities/strategy_briefing.entity';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StrategyBriefing]),
    forwardRef(() => EventModule),
    UserPermissionModule,
  ],
  exports: [StrategyBriefingService],
  controllers: [StrategyBriefingController],
  providers: [StrategyBriefingService]
})
export class StrategyBriefingModule {}
