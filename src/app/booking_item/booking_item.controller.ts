import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingListService } from '../booking_list/booking_list.service';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { BookingItemService } from './booking_item.service';
import { CreateBookingItemDto } from './dto/create-booking_item.dto';
import { UpdateBookingItemDto } from './dto/update-booking_item.dto';

@Controller('/api/v1/events/:event_id/booking-lists/:booking_list_id/booking-items')
@ApiTags('Reservas')
export class BookingItemController {
  constructor(
    private readonly bookingItemService: BookingItemService,
    private readonly eventService: EventService,
    private readonly bookingListService: BookingListService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar todas as Reservas de uma Lista de Reservas' })
  @ApiResponse({ status: 200, description: 'Reservas listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reservas não encontrados' })
  async findAll(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingItemService.findAll(booking_list.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Reserva' })
  @ApiResponse({ status: 201, description: 'Reserva criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reservas não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (code, value)' })
  async create(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
    @Body() createBookingItemDto: CreateBookingItemDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return this.bookingItemService.create(booking_list.id, createBookingItemDto);
  }

  @Get(':booking_item_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Ver Reserva' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reservas não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Param('booking_item_id') booking_item_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingItemService.findOne({
      where: { id: booking_item_id, booking_list_id: booking_list.id },
    });
  }

  @Put(':booking_item_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Reserva' })
  @ApiResponse({ status: 200, description: 'Reserva editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reservas não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (code, value)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Param('booking_item_id') booking_item_id: string,
    @Req() req: any,
    @Body() updateBookingItemDto: UpdateBookingItemDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingItemService.update(
      booking_item_id,
      booking_list.id,
      updateBookingItemDto,
    );
  }

  @Delete(':booking_item_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Reserva' })
  @ApiResponse({ status: 204, description: 'Reserva removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reservas não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Param('booking_item_id') booking_item_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingItemService.remove(booking_item_id, booking_list.id);
  }
}
