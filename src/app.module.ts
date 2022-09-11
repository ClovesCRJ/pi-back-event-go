import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUser1645916000000,
  CreateEventBriefing1645916732538,
  CreatePublicBriefing1645923721172,
  CreateMarketingBriefing1645925019217,
  CreateStrategyBriefing1645925535607,
  CreatePromotionBriefing1645926087322,
  CreateBriefing1645927000000,
  CreateEvent1645927400000,
  CreateUserPermission1645927500000,
  CreateCheckList1645928271438,
  CreateCheckItem1645928622576,
  CreateCostList1645931144342,
  CreateCostItem1645931305659,
  CreateTicketRevenueList1645934217642,
  CreateTicketRevenue1645934413714,
  CreateEventRevenue1645935433040,
} from './database';
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
      type: "postgres",
      host: process.env.TYPEORM_HOST,
      port: Number.parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [],
      migrations: [
        CreateUser1645916000000,
        CreateEventBriefing1645916732538,
        CreatePublicBriefing1645923721172,
        CreateMarketingBriefing1645925019217,
        CreateStrategyBriefing1645925535607,
        CreatePromotionBriefing1645926087322,
        CreateBriefing1645927000000,
        CreateEvent1645927400000,
        CreateUserPermission1645927500000,
        CreateCheckList1645928271438,
        CreateCheckItem1645928622576,
        CreateCostList1645931144342,
        CreateCostItem1645931305659,
        CreateTicketRevenueList1645934217642,
        CreateTicketRevenue1645934413714,
        CreateEventRevenue1645935433040,
      ],
    }),
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
