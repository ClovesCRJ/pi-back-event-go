import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, HttpCode, HttpStatus, Inject, forwardRef, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';
import { PostEventDto } from './dto/post-event.dto';
import { BriefingService } from '../briefing/briefing.service';
import { EventBriefingService } from '../event_briefing/event_briefing.service';
import { MarketingBriefingService } from '../marketing_briefing/marketing_briefing.service';
import { PromotionBriefingService } from '../promotion_briefing/promotion_briefing.service';
import { PublicBriefingService } from '../public_briefing/public_briefing.service';
import { StrategyBriefingService } from '../strategy_briefing/strategy_briefing.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPermissionService } from '../user_permission/user_permission.service';

@Controller('api/v1/events')
@ApiTags('Eventos')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    @Inject(forwardRef(() => BriefingService))
    private readonly briefingService: BriefingService,
    private readonly eventBriefingService: EventBriefingService,
    private readonly marketingBriefingService: MarketingBriefingService,
    private readonly promotionBriefingService: PromotionBriefingService,
    private readonly publicBriefingService: PublicBriefingService,
    private readonly strategyBriefingService: StrategyBriefingService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Evento' })
  @ApiResponse({ status: 201, description: 'Evento criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (event_name)' })
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
    
    const event = await this.eventService.create({
      briefing_id: briefing.id,
      owner_id: req.user.id,
    });

    await this.userPermissionService.create({
      event_id: event.id,
      user_email: req.user.email,
      briefing_read: true,
      briefing_write: true,
      check_list_read: true,
      check_list_write: true,
      costs_read: true,
      costs_write: true,
      ticket_revenue_read: true,
      ticket_revenue_write: true,
      event_revenue_read: true,
      event_revenue_write: true,
      finance_read: true,
      finance_write: true,
      booking_read: true,
      booking_write: true,
      tickets_list_read: true,
      tickets_list_write: true,
      annotation_read: true,
      annotation_write: true,
    }, req.user.id);

    return event;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Eventos' })
  @ApiResponse({ status: 200, description: 'Eventos listados com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  async findAll(@Req() req: any) {
    return await this.eventService.findAllBelong(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Evento' })
  @ApiResponse({ status: 200, description: 'Evento listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('id') id: string, @Req() req: any, @Query('relations') relations: any) {
    return await this.eventService.findOneBelong({
      relations,
      where: { id, owner_id: req.user.id },
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Evento' })
  @ApiResponse({ status: 204, description: 'Evento removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async remove(@Param('id') id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      where: { id, owner_id: req.user.id },
    });

    const eventResult = await this.eventService.delete(event.id);
    
    return eventResult;
  }
}
