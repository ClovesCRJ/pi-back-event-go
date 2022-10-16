import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBookingListDto } from './dto/create-booking_list.dto';
import { UpdateBookingListDto } from './dto/update-booking_list.dto';
import { BookingList } from './entities/booking_list.entity';

@Injectable()
export class BookingListService {
  constructor(
    @InjectRepository(BookingList)
    private readonly bookingListRepository: Repository<BookingList>,
  ) {}
  
  async create(event_id: string, createBookingListDto: CreateBookingListDto) {
    const bookingList = await this.bookingListRepository.create({
      ...createBookingListDto,
      event_id,
    });
    return await this.bookingListRepository.save(bookingList);
  }

  async findAll(event_id: string) {
    return await this.bookingListRepository.find({
      relations: ["booking_items"],
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<BookingList>) {
    try {
      return await this.bookingListRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.BOOKING_LIST_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateBookingListDto: UpdateBookingListDto) {
    const bookingList = await this.findOne({
      where: { id, event_id },
    });
    this.bookingListRepository.merge(bookingList, updateBookingListDto);
    return await this.bookingListRepository.save(bookingList);
  }

  async remove(id: string) {
    return await this.bookingListRepository.delete({ id });
  }
}
