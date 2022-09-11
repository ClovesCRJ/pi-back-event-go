import { Test, TestingModule } from '@nestjs/testing';
import { EventRevenueController } from './event_revenue.controller';
import { EventRevenueService } from './event_revenue.service';

describe('EventRevenueController', () => {
  let controller: EventRevenueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRevenueController],
      providers: [EventRevenueService],
    }).compile();

    controller = module.get<EventRevenueController>(EventRevenueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
