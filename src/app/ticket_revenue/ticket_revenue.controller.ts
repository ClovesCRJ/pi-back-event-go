import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { TicketRevenueListService } from '../ticket_revenue_list/ticket_revenue_list.service';
import { CreateTicketRevenueDto } from './dto/create-ticket_revenue.dto';
import { UpdateTicketRevenueDto } from './dto/update-ticket_revenue.dto';
import { TicketRevenueService } from './ticket_revenue.service';

@Controller('/api/v1/events/:event_id/ticket-revenue-lists/:ticket_revenue_list_id/ticket-revenues')
@ApiTags('Receitas de Ingressos')
export class TicketRevenueController {
  constructor(
    private readonly ticketRevenueService: TicketRevenueService,
    private readonly eventService: EventService,
    @Inject(forwardRef(() => TicketRevenueListService))
    private readonly ticketRevenueListService: TicketRevenueListService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Receitas de Ingressos' })
  @ApiResponse({ status: 200, description: 'Receitas de Ingressos listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Receitas de Ingressos não encontrados' })
  async findAll(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticketRevenueList = await this.ticketRevenueListService.findOne({
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    return await this.ticketRevenueService.findAll(ticketRevenueList.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Receita de Ingressos' })
  @ApiResponse({ status: 201, description: 'Receita de Ingressos criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Receitas de Ingressos não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name, quantity, value_unit, taxes)' })
  async create(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
    @Body() createTicketRevenueDto: CreateTicketRevenueDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticketRevenueList = await this.ticketRevenueListService.findOne({
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    return this.ticketRevenueService.create(ticketRevenueList.id, createTicketRevenueDto);
  }

  @Get(':ticket_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Receita de Ingressos' })
  @ApiResponse({ status: 200, description: 'Receita de Ingressos listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Receitas de Ingressos ou Receita de Ingressos não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Param('ticket_revenue_id') ticket_revenue_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticketRevenueList = await this.ticketRevenueListService.findOne({
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    return await this.ticketRevenueService.findOne({
      where: { id: ticket_revenue_id, ticket_revenue_list_id: ticketRevenueList.id },
    });
  }

  @Put(':ticket_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Receita de Ingressos' })
  @ApiResponse({ status: 200, description: 'Receita de Ingressos editar com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Receitas de Ingressos ou Receita de Ingressos não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name, quantity, value_unit, taxes)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Param('ticket_revenue_id') ticket_revenue_id: string,
    @Req() req: any,
    @Body() updateTicketRevenueDto: UpdateTicketRevenueDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticketRevenueList = await this.ticketRevenueListService.findOne({
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    return await this.ticketRevenueService.update(
      ticket_revenue_id,
      ticketRevenueList.id,
      updateTicketRevenueDto,
    );
  }

  @Delete(':ticket_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Receita de Ingressos' })
  @ApiResponse({ status: 204, description: 'Receita de Ingressos removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Receitas de Ingressos ou Receita de Ingressos não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Param('ticket_revenue_id') ticket_revenue_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticketRevenueList = await this.ticketRevenueListService.findOne({
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    return await this.ticketRevenueService.remove(ticket_revenue_id, ticketRevenueList.id);
  }
}
