import { Test, TestingModule } from '@nestjs/testing';
import { TicketListController } from './ticket_list.controller';

describe('TicketListController', () => {
  let controller: TicketListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketListController],
    }).compile();

    controller = module.get<TicketListController>(TicketListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
