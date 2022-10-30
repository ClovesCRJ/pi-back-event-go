import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { TicketRevenueService } from '../ticket_revenue/ticket_revenue.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { CreateTicketRevenueListDto } from './dto/create-ticket_revenue_list.dto';
import { UpdateTicketRevenueListDto } from './dto/update-ticket_revenue_list.dto';
import { TicketRevenueListService } from './ticket_revenue_list.service';

@Controller('/api/v1/events/:event_id/ticket-revenue-lists')
@ApiTags('Categorias de Receitas de Ingressos')
export class TicketRevenueListController {
  constructor(
    private readonly ticketRevenueListService: TicketRevenueListService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Categoria de Receitas de Ingressos' })
  @ApiResponse({ status: 201, description: 'Categoria de Receitas de Ingressos criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createTicketRevenueListDto: CreateTicketRevenueListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, ticket_revenue_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketRevenueListService.create(
      event.id,
      createTicketRevenueListDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categorias de Receitas de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categorias de Receitas de Ingressos listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, ticket_revenue_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketRevenueListService.findAll(event.id);
  }

  @Get('total')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Total de Receitas de Ingressos' })
  @ApiResponse({ status: 200, description: 'Total de Receitas de Ingressos listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findTotal(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, ticket_revenue_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const ticketRevenueLists =  await this.ticketRevenueListService.findAll(event.id);

    let total_quantity = 0;
    let total_value = 0;

    ticketRevenueLists.forEach((ticketRevenueList) => {
      ticketRevenueList.ticket_revenues.forEach(ticketRevenue => {
        total_quantity += ticketRevenue.quantity;
        total_value += ticketRevenue.value_unit * ticketRevenue.quantity;
      });
    });

    return {
      total_quantity,
      total_value,
    };
  }

  @Get(':ticket_revenue_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categoria de Receitas de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categoria de Receitas de Ingressos listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Receitas de Ingressos não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, ticket_revenue_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketRevenueListService.findOne({
      relations: ["ticket_revenues"],
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
  }

  @Put(':ticket_revenue_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Categoria de Receitas de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categoria de Receitas de Ingressos editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Receitas de Ingressos não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
    @Body() updateTicketRevenueListDto: UpdateTicketRevenueListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, ticket_revenue_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketRevenueListService.update(
      event.id,
      ticket_revenue_list_id,
      updateTicketRevenueListDto,
    );
  }

  @Delete(':ticket_revenue_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Categoria de Receitas de Ingressos' })
  @ApiResponse({ status: 204, description: 'Categoria de Receitas de Ingressos removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Receitas de Ingressos não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, ticket_revenue_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const ticket_revenue_list = await this.ticketRevenueListService.findOne({
      relations: ["ticket_revenues"],
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    return await this.ticketRevenueListService.remove(ticket_revenue_list.id);
  }
}
