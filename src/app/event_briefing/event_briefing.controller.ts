import { Controller, Get, Body, Param, Req, Inject, forwardRef, UseGuards, Put } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { UpdateEventBriefingDto } from './dto/update-event_briefing.dto';
import { EventService } from '../event/event.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/events/:event_id/event-briefing')
@ApiTags('Briefing do Evento')
export class EventBriefingController {
  constructor(
    private readonly eventBriefingService: EventBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Briefing do Evento' })
  @ApiResponse({ status: 200, description: 'Briefing do Evento listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.event_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return event.briefing.event_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Briefing do Evento' })
  @ApiResponse({ status: 200, description: 'Briefing do Evento editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async update(
    @Param('event_id') event_id: string,
    @Body() updateEventBriefingDto: UpdateEventBriefingDto,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.event_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return this.eventBriefingService.update(
      event.briefing.event_briefing_id,
      updateEventBriefingDto,
    );
  }
}
