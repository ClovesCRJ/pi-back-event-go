import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { UserPermissionModule } from './user_permission/user_permission.module';
import { BriefingModule } from './briefing/briefing.module';
import { EventBriefingModule } from './event_briefing/event_briefing.module';
import { MarketingBriefingModule } from './marketing_briefing/marketing_briefing.module';
import { PromotionBriefingModule } from './promotion_briefing/promotion_briefing.module';
import { PublicBriefingModule } from './public_briefing/public_briefing.module';
import { StrategyBriefingModule } from './strategy_briefing/strategy_briefing.module';
import { CheckListModule } from './check_list/check_list.module';
import { CheckItemModule } from './check_item/check_item.module';
import { CostListModule } from './cost_list/cost_list.module';
import { CostItemModule } from './cost_item/cost_item.module';
import { EventRevenueModule } from './event_revenue/event_revenue.module';
import { TicketRevenueListModule } from './ticket_revenue_list/ticket_revenue_list.module';
import { TicketRevenueModule } from './ticket_revenue/ticket_revenue.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + "/**/entities/*.entity{.js,.ts}"],
      synchronize: true,
    } as TypeOrmModule),
    UserModule,
    EventModule,
    UserPermissionModule,
    BriefingModule,
    EventBriefingModule,
    MarketingBriefingModule,
    PromotionBriefingModule,
    PublicBriefingModule,
    StrategyBriefingModule,
    CheckListModule,
    CheckItemModule,
    CostListModule,
    CostItemModule,
    EventRevenueModule,
    TicketRevenueListModule,
    TicketRevenueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
