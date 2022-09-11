import { Test, TestingModule } from '@nestjs/testing';
import { TicketRevenueController } from './ticket_revenue.controller';
import { TicketRevenueService } from './ticket_revenue.service';

describe('TicketRevenueController', () => {
  let controller: TicketRevenueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketRevenueController],
      providers: [TicketRevenueService],
    }).compile();

    controller = module.get<TicketRevenueController>(TicketRevenueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
