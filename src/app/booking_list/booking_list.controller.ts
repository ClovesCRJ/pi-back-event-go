import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingItemService } from '../booking_item/booking_item.service';
import { EventService } from '../event/event.service';
import { BookingListService } from './booking_list.service';
import { CreateBookingListDto } from './dto/create-booking_list.dto';
import { UpdateBookingListDto } from './dto/update-booking_list.dto';

@Controller('/api/v1/events/:event_id/booking-lists')
export class BookingListController {
  constructor(
    private readonly bookingListService: BookingListService,
    @Inject(forwardRef(() => BookingItemService))
    private readonly bookingItemService: BookingItemService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createBookingListDto: CreateBookingListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.bookingListService.create(event.id, createBookingListDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.bookingListService.findAll(event.id);
  }

  @Get(':booking_list_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.bookingListService.findOne({
      relations: ["booking_items"],
      where: { id: booking_list_id, event_id: event.id },
    });
  }

  @Put(':booking_list_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
    @Body() updateBookingListDto: UpdateBookingListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
  async remove(
    @Param('event_id') event_id: string,
    @Param('booking_list_id') booking_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const bookingList = await this.bookingListService.findOne({
      relations: ["booking_items"],
      where: { id: booking_list_id, event_id: event.id },
    });
    for (const booking_item in bookingList.booking_items) {
      if (Object.prototype.hasOwnProperty.call(bookingList.booking_items, booking_item)) {
        const item = bookingList.booking_items[booking_item];
        await this.bookingItemService.remove(item.id, bookingList.id);
      }
    }
    return await this.bookingListService.remove(booking_list_id);
  }
}
