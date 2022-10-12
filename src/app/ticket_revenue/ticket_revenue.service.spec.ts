import { Test, TestingModule } from '@nestjs/testing';
import { TicketRevenueService } from './ticket_revenue.service';

describe('TicketRevenueService', () => {
  let service: TicketRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketRevenueService],
    }).compile();

    service = module.get<TicketRevenueService>(TicketRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
