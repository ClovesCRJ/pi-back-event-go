import { Test, TestingModule } from '@nestjs/testing';
import { BookingListController } from './booking_list.controller';

describe('BookingListController', () => {
  let controller: BookingListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingListController],
    }).compile();

    controller = module.get<BookingListController>(BookingListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
