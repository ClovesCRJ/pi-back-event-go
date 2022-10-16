import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBookingItemDto } from './dto/create-booking_item.dto';
import { UpdateBookingItemDto } from './dto/update-booking_item.dto';
import { BookingItem } from './entities/booking_item.entity';

@Injectable()
export class BookingItemService {
  constructor(
    @InjectRepository(BookingItem)
    private readonly bookingItemRepository: Repository<BookingItem>,
  ) {}

  async create(booking_list_id: string, createBookingItemDto: CreateBookingItemDto) {
    const bookingItem = await this.bookingItemRepository.create({
      ...createBookingItemDto,
      booking_list_id,
    });
    return await this.bookingItemRepository.save(bookingItem);
  }

  async findAll(booking_list_id: string) {
    return await this.bookingItemRepository.find({
      where: { booking_list_id }
    });
  }

  async findOne(options: FindOneOptions<BookingItem>) {
    try {
      return await this.bookingItemRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.BOOKING_ITEM_NOT_FOUND);
    }
  }

  async update(id: string, booking_list_id: string, updateBookingItemDto: UpdateBookingItemDto) {
    const bookingItem = await this.findOne({
      where: { id, booking_list_id },
    });
    this.bookingItemRepository.merge(bookingItem, updateBookingItemDto);
    return await this.bookingItemRepository.save(bookingItem);
  }

  async remove(id: string, booking_list_id: string) {
    const bookingItem = await this.findOne({
      where: { id, booking_list_id },
    });
    return await this.bookingItemRepository.delete({ id: bookingItem.id });
  }
}
