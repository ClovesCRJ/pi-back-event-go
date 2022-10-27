import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { TicketListService } from '../ticket_list/ticket_list.service';
import { CreateTicketItemDto } from './dto/create-ticket_item.dto';
import { UpdateTicketItemDto } from './dto/update-ticket_item.dto';
import { TicketItemService } from './ticket_item.service';

@Controller('/api/v1/events/:event_id/ticket-lists/:ticket_list_id/ticket-items')
@ApiTags('Ticket Item')
export class TicketItemController {
  constructor(
    private readonly ticketItemService: TicketItemService,
    private readonly eventService: EventService,
    private readonly ticketListService: TicketListService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Ingressos' })
  @ApiResponse({ status: 200, description: 'Ingressos listados com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Ingressos não encontrados' })
  async findAll(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
  ): Promise<any> {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticket_list = await this.ticketListService.findOne({
      where: { id: ticket_list_id, event_id: event.id },
    });
    return await this.ticketItemService.findAll(ticket_list.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Ingresso' })
  @ApiResponse({ status: 200, description: 'Ingresso criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Ingressos não encontrados' })
  async create(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
    @Body() createTicketItemDto: CreateTicketItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticket_list = await this.ticketListService.findOne({
      where: { id: ticket_list_id, event_id: event.id },
    });
    return this.ticketItemService.create(ticket_list.id, createTicketItemDto);
  }

  @Get(':ticket_item_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Ingresso' })
  @ApiResponse({ status: 200, description: 'Ingresso listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Ingressos ou Ingresso não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Param('ticket_item_id') ticket_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticket_list = await this.ticketListService.findOne({
      where: { id: ticket_list_id, event_id: event.id },
    });
    return await this.ticketItemService.findOne({
      where: { id: ticket_item_id, ticket_list_id: ticket_list.id },
    });
  }

  @Put(':ticket_item_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Ingresso' })
  @ApiResponse({ status: 200, description: 'Ingresso editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Ingressos ou Ingresso não encontrados' })
  async update(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Param('ticket_item_id') ticket_item_id: string,
    @Req() req: any,
    @Body() updateTicketItemDto: UpdateTicketItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticket_list = await this.ticketListService.findOne({
      where: { id: ticket_list_id, event_id: event.id },
    });
    return await this.ticketItemService.update(
      ticket_item_id,
      ticket_list.id,
      updateTicketItemDto,
    );
  }

  @Delete(':ticket_item_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Ingresso' })
  @ApiResponse({ status: 200, description: 'Ingresso removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Ingressos ou Ingresso não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Param('ticket_item_id') ticket_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticket_list = await this.ticketListService.findOne({
      where: { id: ticket_list_id, event_id: event.id },
    });
    return await this.ticketItemService.remove(ticket_item_id, ticket_list.id);
  }
}
