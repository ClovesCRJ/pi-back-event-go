import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingListService } from '../booking_list/booking_list.service';
import { EventService } from '../event/event.service';
import { BookingItemService } from './booking_item.service';
import { CreateBookingItemDto } from './dto/create-booking_item.dto';
import { UpdateBookingItemDto } from './dto/update-booking_item.dto';

@Controller('/api/v1/events/:event_id/booking-lists/:booking_list_id/booking-items')
export class BookingItemController {
  constructor(
    private readonly bookingItemService: BookingItemService,
    private readonly eventService: EventService,
    @Inject(forwardRef(() => BookingListService))
    private readonly bookingListService: BookingListService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingItemService.findAll(booking_list.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
    @Body() createBookingItemDto: CreateBookingItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return this.bookingItemService.create(booking_list.id, createBookingItemDto);
  }

  @Get(':booking_item_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Param('booking_item_id') booking_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
  async update(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Param('booking_item_id') booking_item_id: string,
    @Req() req: any,
    @Body() updateBookingItemDto: UpdateBookingItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
  async remove(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Param('booking_item_id') booking_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const booking_list = await this.bookingListService.findOne({
      where: { id: booking_list_id, event_id: event.id },
    });
    return await this.bookingItemService.remove(booking_item_id, booking_list.id);
  }
}
