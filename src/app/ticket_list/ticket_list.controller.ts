import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { TicketItemService } from '../ticket_item/ticket_item.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { CreateTicketListDto } from './dto/create-ticket_list.dto';
import { UpdateTicketListDto } from './dto/update-ticket_list.dto';
import { TicketListService } from './ticket_list.service';

@Controller('/api/v1/events/:event_id/ticket-lists')
@ApiTags('Categoria de Ingressos')
export class TicketListController {
  constructor(
    private readonly ticketListService: TicketListService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Categoria de Ingressos' })
  @ApiResponse({ status: 201, description: 'Categoria de Ingressos criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createTicketListDto: CreateTicketListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, tickets_list_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketListService.create(event.id, createTicketListDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categorias de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categorias de Ingressos listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, tickets_list_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketListService.findAll(event.id);
  }

  @Get('total')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categorias de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categorias de Ingressos listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findTotal(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, tickets_list_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const ticketLists = await this.ticketListService.findAll(event.id);
    
    let totalRevenue = 0;
    let totalAmount = 0;
    let ticketsSales = [];

    ticketLists.forEach((ticketList) => {
      let total_type = 0;
      ticketList.ticket_items.forEach(ticketItem => {
        totalRevenue += ticketItem.sale_value * ticketItem.quantity_sold;
        totalAmount += ticketItem.quantity_sold;
        total_type += ticketItem.quantity_sold;
      });
      ticketsSales.push({
        ticket_type: ticketList.name,
        ticket_amount: total_type,
      });
    });
    
    return {
      total_revenue: totalRevenue,
      total_amount: totalAmount,
      tickets_sales: ticketsSales,
    };
  }

  @Get(':ticket_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categoria de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categoria de Ingressos listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Ingressos não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, tickets_list_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketListService.findOne({
      relations: ["ticket_items"],
      where: { id: ticket_list_id, event_id: event.id },
    });
  }

  @Put(':ticket_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Categoria de Ingressos' })
  @ApiResponse({ status: 200, description: 'Categoria de Ingressos editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Ingressos não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
    @Body() updateTicketListDto: UpdateTicketListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, tickets_list_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.ticketListService.update(
      event.id,
      ticket_list_id,
      updateTicketListDto,
    );
  }

  @Delete(':ticket_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Categoria de Ingressos' })
  @ApiResponse({ status: 204, description: 'Categoria de Ingressos removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Ingressos não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, tickets_list_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const ticketList = await this.ticketListService.findOne({
      relations: ["ticket_items"],
      where: { id: ticket_list_id, event_id: event.id },
    });
    return await this.ticketListService.remove(ticketList.id);
  }
}
