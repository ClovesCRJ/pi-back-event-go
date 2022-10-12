import { Test, TestingModule } from '@nestjs/testing';
import { TicketRevenueListController } from './ticket_revenue_list.controller';
import { TicketRevenueListService } from './ticket_revenue_list.service';

describe('TicketRevenueListController', () => {
  let controller: TicketRevenueListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketRevenueListController],
      providers: [TicketRevenueListService],
    }).compile();

    controller = module.get<TicketRevenueListController>(TicketRevenueListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
