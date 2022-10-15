import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCheckListDto } from './dto/create-check_list.dto';
import { UpdateCheckListDto } from './dto/update-check_list.dto';
import { CheckList } from './entities/check_list.entity';

@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private readonly checkListRepository: Repository<CheckList>,
  ) {}
  
  async create(event_id: string, createCheckListDto: CreateCheckListDto) {
    const checkList = await this.checkListRepository.create({
      ...createCheckListDto,
      event_id,
    });
    return await this.checkListRepository.save(checkList);
  }

  async findAll(event_id: string) {
    return await this.checkListRepository.find({
      relations: ["check_items"],
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<CheckList>) {
    try {
      return await this.checkListRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.CHECK_LIST_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateCheckListDto: UpdateCheckListDto) {
    const checkList = await this.findOne({
      where: { id, event_id },
    });
    this.checkListRepository.merge(checkList, updateCheckListDto);
    return await this.checkListRepository.save(checkList);
  }

  async remove(id: string) {
    return await this.checkListRepository.delete({ id });
  }
}
