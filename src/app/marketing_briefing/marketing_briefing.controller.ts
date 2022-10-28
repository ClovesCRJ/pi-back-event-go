import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Inject, forwardRef, Put } from '@nestjs/common';
import { MarketingBriefingService } from './marketing_briefing.service';
import { CreateMarketingBriefingDto } from './dto/create-marketing_briefing.dto';
import { UpdateMarketingBriefingDto } from './dto/update-marketing_briefing.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPermissionService } from '../user_permission/user_permission.service';

@Controller('/api/v1/events/:event_id/marketing-briefing')
@ApiTags('Briefing de Pesquisa de Mercado e Concorrentes')
export class MarketingBriefingController {
  constructor(
    private readonly marketingBriefingService: MarketingBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Briefing de Pesquisa de Mercado e Concorrentes' })
  @ApiResponse({ status: 200, description: 'Briefing de Pesquisa de Mercado e Concorrentes listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, briefing_read: true }
    });
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.marketing_briefing"],
      where: { id: permission.event_id },
    });
    return event.briefing.marketing_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Briefing de Pesquisa de Mercado e Concorrentes' })
  @ApiResponse({ status: 200, description: 'Briefing de Pesquisa de Mercado e Concorrentes editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async update(
    @Param('event_id') event_id: string,
    @Body() updateMarketingBriefingDto: UpdateMarketingBriefingDto,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, briefing_write: true }
    });
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.marketing_briefing"],
      where: { id: permission.event_id },
    });
    return this.marketingBriefingService.update(
      event.briefing.marketing_briefing_id,
      updateMarketingBriefingDto,
    );
  }
}
