import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { CreateEventRevenueDto } from './dto/create-event_revenue.dto';
import { UpdateEventRevenueDto } from './dto/update-event_revenue.dto';
import { EventRevenueService } from './event_revenue.service';

@Controller('/api/v1/events/:event_id/event-revenues')
@ApiTags('Receitas de Evento')
export class EventRevenueController {
  constructor(
    private readonly eventRevenueService: EventRevenueService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Receita de Evento' })
  @ApiResponse({ status: 201, description: 'Receita de Evento criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name, value_unit, quantity)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createEventRevenueDto: CreateEventRevenueDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, event_revenue_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, event_revenue_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, event_revenue_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name, value_unit, quantity)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
    @Body() updateEventRevenueDto: UpdateEventRevenueDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, event_revenue_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
  @ApiResponse({ status: 204, description: 'Receita de Evento removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, event_revenue_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.eventRevenueService.remove(event.id, event_revenue_id);
  }
}
