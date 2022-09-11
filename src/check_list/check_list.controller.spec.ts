import { Test, TestingModule } from '@nestjs/testing';
import { CheckListController } from './check_list.controller';
import { CheckListService } from './check_list.service';

describe('CheckListController', () => {
  let controller: CheckListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckListController],
      providers: [CheckListService],
    }).compile();

    controller = module.get<CheckListController>(CheckListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
