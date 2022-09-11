import { Test, TestingModule } from '@nestjs/testing';
import { TicketRevenueListService } from './ticket_revenue_list.service';

describe('TicketRevenueListService', () => {
  let service: TicketRevenueListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketRevenueListService],
    }).compile();

    service = module.get<TicketRevenueListService>(TicketRevenueListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
