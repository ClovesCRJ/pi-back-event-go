import { Test, TestingModule } from '@nestjs/testing';
import { TicketItemController } from './ticket_item.controller';

describe('TicketItemController', () => {
  let controller: TicketItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketItemController],
    }).compile();

    controller = module.get<TicketItemController>(TicketItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
