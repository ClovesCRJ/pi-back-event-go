import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
  findAll() {
    return this.eventService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventService.update(+id, updateEventDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
