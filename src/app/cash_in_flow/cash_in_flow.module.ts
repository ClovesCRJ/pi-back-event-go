import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { CashInFlowController } from './cash_in_flow.controller';
import { CashInFlowService } from './cash_in_flow.service';
import { CashInFlow } from './entities/cash_in_flow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashInFlow]),
    EventModule,
  ],
  exports: [CashInFlowService],
  controllers: [CashInFlowController],
  providers: [CashInFlowService]
})
export class CashInFlowModule {}
