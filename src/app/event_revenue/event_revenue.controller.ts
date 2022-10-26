import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { CreateEventRevenueDto } from './dto/create-event_revenue.dto';
import { UpdateEventRevenueDto } from './dto/update-event_revenue.dto';
import { EventRevenueService } from './event_revenue.service';

@Controller('/api/v1/events/:event_id/event-revenues')
@ApiTags('Event Revenue')
export class EventRevenueController {
  constructor(
    private readonly eventRevenueService: EventRevenueService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Receita de Evento' })
  @ApiResponse({ status: 200, description: 'Receita de Evento criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createEventRevenueDto: CreateEventRevenueDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.create(event.id, createEventRevenueDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Receitas de Evento' })
  @ApiResponse({ status: 200, description: 'Receitas de Evento listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.findAll(event.id);
  }

  @Get(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Receita de Evento' })
  @ApiResponse({ status: 200, description: 'Receita de Evento listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.findOne({
      where: { id: event_revenue_id, event_id: event.id },
    });
  }

  @Put(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Receita de Evento' })
  @ApiResponse({ status: 200, description: 'Receita de Evento editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async update(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
    @Body() updateEventRevenueDto: UpdateEventRevenueDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.update(
      event.id,
      event_revenue_id,
      updateEventRevenueDto,
    );
  }

  @Delete(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Receita de Evento' })
  @ApiResponse({ status: 200, description: 'Receita de Evento removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.remove(event.id, event_revenue_id);
  }
}
