import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingItemService } from '../booking_item/booking_item.service';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { BookingListService } from './booking_list.service';
import { CreateBookingListDto } from './dto/create-booking_list.dto';
import { UpdateBookingListDto } from './dto/update-booking_list.dto';

@Controller('/api/v1/events/:event_id/booking-lists')
@ApiTags('Listas de Reservas')
export class BookingListController {
  constructor(
    private readonly bookingListService: BookingListService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Lista de Reservas' })
  @ApiResponse({ status: 201, description: 'Reserva encontrada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createBookingListDto: CreateBookingListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.bookingListService.create(event.id, createBookingListDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar todas as Listas de Reservas' })
  @ApiResponse({ status: 200, description: 'Listas de Reserva listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.bookingListService.findAll(event.id);
  }

  @Get(':booking_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Lista de Reservas' })
  @ApiResponse({ status: 200, description: 'Lista de Reserva listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reserva não encontrados' })
  async findOne(
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
    return await this.bookingListService.findOne({
      relations: ["booking_items"],
      where: { id: booking_list_id, event_id: event.id },
    });
  }

  @Put(':booking_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Lista de Reservas' })
  @ApiResponse({ status: 200, description: 'Lista de Reserva editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reserva não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
    @Body() updateBookingListDto: UpdateBookingListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.bookingListService.update(
      event.id,
      booking_list_id,
      updateBookingListDto,
    );
  }

  @Delete(':booking_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Lista de Reservas' })
  @ApiResponse({ status: 204, description: 'Lista de Reserva removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Lista de Reserva não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, booking_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const bookingList = await this.bookingListService.findOne({
      relations: ["booking_items"],
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingListService.remove(bookingList.id);
  }
}
