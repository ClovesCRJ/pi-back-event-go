import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { EventModule } from './app/event/event.module';
import { UserPermissionModule } from './app/user_permission/user_permission.module';
import { BriefingModule } from './app/briefing/briefing.module';
import { EventBriefingModule } from './app/event_briefing/event_briefing.module';
import { MarketingBriefingModule } from './app/marketing_briefing/marketing_briefing.module';
import { PromotionBriefingModule } from './app/promotion_briefing/promotion_briefing.module';
import { PublicBriefingModule } from './app/public_briefing/public_briefing.module';
import { StrategyBriefingModule } from './app/strategy_briefing/strategy_briefing.module';
import { CheckListModule } from './app/check_list/check_list.module';
import { CheckItemModule } from './app/check_item/check_item.module';
import { CostListModule } from './app/cost_list/cost_list.module';
import { CostItemModule } from './app/cost_item/cost_item.module';
import { EventRevenueModule } from './app/event_revenue/event_revenue.module';
import { TicketRevenueListModule } from './app/ticket_revenue_list/ticket_revenue_list.module';
import { TicketRevenueModule } from './app/ticket_revenue/ticket_revenue.module';
import { AuthModule } from './app/auth/auth.module';
import { CashInFlowModule } from './app/cash_in_flow/cash_in_flow.module';
import { CashOutFlowModule } from './app/cash_out_flow/cash_out_flow.module';
import { BookingListModule } from './app/booking_list/booking_list.module';
import { BookingItemModule } from './app/booking_item/booking_item.module';
import { TicketListModule } from './app/ticket_list/ticket_list.module';
import { TicketItemModule } from './app/ticket_item/ticket_item.module';
import { AnnotationModule } from './app/annotation/annotation.module';

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
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    } as TypeOrmModuleOptions),
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
    AuthModule,
    CashInFlowModule,
    CashOutFlowModule,
    BookingListModule,
    BookingItemModule,
    TicketListModule,
    TicketItemModule,
    AnnotationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
