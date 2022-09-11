import { Test, TestingModule } from '@nestjs/testing';
import { EventRevenueService } from './event_revenue.service';

describe('EventRevenueService', () => {
  let service: EventRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventRevenueService],
    }).compile();

    service = module.get<EventRevenueService>(EventRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
