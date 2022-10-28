import { Controller, Get, Post, Body, Patch, Param, Delete, forwardRef, Inject, UseGuards, Req, Put } from '@nestjs/common';
import { StrategyBriefingService } from './strategy_briefing.service';
import { CreateStrategyBriefingDto } from './dto/create-strategy_briefing.dto';
import { UpdateStrategyBriefingDto } from './dto/update-strategy_briefing.dto';
import { EventService } from '../event/event.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPermissionService } from '../user_permission/user_permission.service';

@Controller('/api/v1/events/:event_id/strategy-briefing')
@ApiTags('Briefing de Informações Estratégicas')
export class StrategyBriefingController {
  constructor(
    private readonly strategyBriefingService: StrategyBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Briefing de Informações Estratégicas' })
  @ApiResponse({ status: 200, description: 'Briefing de Informações Estratégicas listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, briefing_read: true }
    });
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.strategy_briefing"],
      where: { id: permission.event_id },
    });
    return event.briefing.strategy_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Briefing de Informações Estratégicas' })
  @ApiResponse({ status: 200, description: 'Briefing de Informações Estratégicas editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async update(
    @Param('event_id') event_id: string,
    @Body() updateStrategyBriefingDto: UpdateStrategyBriefingDto,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, briefing_write: true }
    });
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.strategy_briefing"],
      where: { id: permission.event_id },
    });
    return this.strategyBriefingService.update(
      event.briefing.strategy_briefing_id,
      updateStrategyBriefingDto,
    );
  }
}
