import { Controller, Get, Post, Body, Patch, Param, Delete, forwardRef, Inject, UseGuards, Req, Put } from '@nestjs/common';
import { StrategyBriefingService } from './strategy_briefing.service';
import { CreateStrategyBriefingDto } from './dto/create-strategy_briefing.dto';
import { UpdateStrategyBriefingDto } from './dto/update-strategy_briefing.dto';
import { EventService } from '../event/event.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/events/:event_id/strategy-briefing')
export class StrategyBriefingController {
  constructor(
    private readonly strategyBriefingService: StrategyBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.strategy_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return event.briefing.strategy_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Body() updateStrategyBriefingDto: UpdateStrategyBriefingDto,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.strategy_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return this.strategyBriefingService.update(
      event.briefing.strategy_briefing_id,
      updateStrategyBriefingDto,
    );
  }
}
