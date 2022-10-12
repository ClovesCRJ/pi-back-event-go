import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { PostEventDto } from './dto/post-event.dto';
import { BriefingService } from '../briefing/briefing.service';
import { EventBriefingService } from '../event_briefing/event_briefing.service';
import { MarketingBriefingService } from '../marketing_briefing/marketing_briefing.service';
import { PromotionBriefingService } from '../promotion_briefing/promotion_briefing.service';
import { PublicBriefingService } from '../public_briefing/public_briefing.service';
import { StrategyBriefingService } from '../strategy_briefing/strategy_briefing.service';
// import { UpdateEventDto } from './dto/update-event.dto';

@Controller('api/v1/events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly briefingService: BriefingService,
    private readonly eventBriefingService: EventBriefingService,
    private readonly marketingBriefingService: MarketingBriefingService,
    private readonly promotionBriefingService: PromotionBriefingService,
    private readonly publicBriefingService: PublicBriefingService,
    private readonly strategyBriefingService: StrategyBriefingService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() postEventDto: PostEventDto, @Req() req: any) {
    const eventBriefing = await this.eventBriefingService.create({
      name: postEventDto.event_name,
    });
    const publicBriefing = await this.publicBriefingService.create({});
    const marketingBriefing = await this.marketingBriefingService.create({});
    const strategyBriefing = await this.strategyBriefingService.create({});
    const promotionBriefing = await this.promotionBriefingService.create({});
    
    const briefing = await this.briefingService.create({
      event_briefing_id: eventBriefing.id,
      public_briefing_id: publicBriefing.id,
      marketing_briefing_id: marketingBriefing.id,
      strategy_briefing_id: strategyBriefing.id,
      promotion_briefing_id: promotionBriefing.id,
    });
    
    return await this.eventService.create({
      briefing_id: briefing.id,
      owner_id: req.user.id,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: any) {
    return await this.eventService.findAllBelong(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Req() req: any) {
    return await this.eventService.findOneBelong({
      relations: ["briefing", "briefing.event_briefing"],
      where: { id, owner_id: req.user.id },
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing"],
      where: { id, owner_id: req.user.id },
    });

    const eventResult = await this.eventService.delete(event.id);
    
    const briefingResult = await this.briefingService.delete(event.briefing_id);

    const eventBriefingResult = await this.eventBriefingService.delete(event.briefing.event_briefing_id);
    const publicBriefingResult = await this.publicBriefingService.delete(event.briefing.public_briefing_id);
    const marketingBriefingResult = await this.marketingBriefingService.delete(event.briefing.marketing_briefing_id);
    const strategyBriefingResult = await this.strategyBriefingService.delete(event.briefing.strategy_briefing_id);
    const promotionBriefingResult = await this.promotionBriefingService.delete(event.briefing.promotion_briefing_id);

    return eventResult;
  }
}
