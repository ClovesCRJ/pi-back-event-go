import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';
import { CashOutFlowController } from './cash_out_flow.controller';
import { CashOutFlowService } from './cash_out_flow.service';
import { CashOutFlow } from './entities/cash_out_flow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashOutFlow]),
    EventModule,
    UserPermissionModule,
  ],
  exports: [CashOutFlowService],
  controllers: [CashOutFlowController],
  providers: [CashOutFlowService]
})
export class CashOutFlowModule {}
