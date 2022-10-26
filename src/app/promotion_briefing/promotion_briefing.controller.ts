import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, UseGuards, Req, Put } from '@nestjs/common';
import { PromotionBriefingService } from './promotion_briefing.service';
import { CreatePromotionBriefingDto } from './dto/create-promotion_briefing.dto';
import { UpdatePromotionBriefingDto } from './dto/update-promotion_briefing.dto';
import { EventService } from '../event/event.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/events/:event_id/promotion-briefing')
@ApiTags('Promotion Briefing')
export class PromotionBriefingController {
  constructor(
    private readonly promotionBriefingService: PromotionBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Briefing de Promoção' })
  @ApiResponse({ status: 200, description: 'Briefing de Promoção listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.promotion_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return event.briefing.promotion_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Briefing de Promoção' })
  @ApiResponse({ status: 200, description: 'Briefing de Promoção editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async update(
    @Param('event_id') event_id: string,
    @Body() updatePromotionBriefingDto: UpdatePromotionBriefingDto,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.promotion_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return this.promotionBriefingService.update(
      event.briefing.promotion_briefing_id,
      updatePromotionBriefingDto,
    );
  }
}
