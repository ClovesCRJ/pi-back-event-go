import { Test, TestingModule } from '@nestjs/testing';
import { BookingItemController } from './booking_item.controller';

describe('BookingItemController', () => {
  let controller: BookingItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingItemController],
    }).compile();

    controller = module.get<BookingItemController>(BookingItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
