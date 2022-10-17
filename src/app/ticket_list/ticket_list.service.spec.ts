import { Test, TestingModule } from '@nestjs/testing';
import { TicketListService } from './ticket_list.service';

describe('TicketListService', () => {
  let service: TicketListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketListService],
    }).compile();

    service = module.get<TicketListService>(TicketListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
