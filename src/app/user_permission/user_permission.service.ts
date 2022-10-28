import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, In, Repository } from 'typeorm';
import { CreateUserPermissionDto } from './dto/create-user_permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user_permission.dto';
import { UserPermission } from './entities/user_permission.entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {}

  async findAll(events_id: string[]) {
    return await this.userPermissionRepository.find({
      where: { event_id: In(events_id) },
      relations: ["user", "event", "event.briefing"]
    });
  }

  async findOne(options: FindOneOptions<UserPermission>) {
    try {
      return await this.userPermissionRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.USER_PERMISSION_NOT_FOUND);
    }
  }

  async findNoOneOrFail(options: FindOneOptions<UserPermission>) {
    const result = await this.userPermissionRepository.findOne(options);
    if(result !== null) {
      throw new BadRequestException(MessagesUtils.USER_PERMISSION_ALREADY_EXISTS)
    } else {
      return result;
    }
  }

  async create(
    createUserPermissionDto: CreateUserPermissionDto,
    user_id: string,
  ) {
    const userPermission = await this.userPermissionRepository.create({
      ...createUserPermissionDto,
      user_id,
    });
    return await this.userPermissionRepository.save(userPermission);
  }

  async update(
    id: string,
    updateUserPermissionDto: UpdateUserPermissionDto,
  ) {
    const userPermission = await this.findOne({
      where: { id },
    });
    this.userPermissionRepository.merge(userPermission, updateUserPermissionDto);
    return await this.userPermissionRepository.save(userPermission);
  }

  async remove(id: string) {
    return await this.userPermissionRepository.delete({ id });
  }
}
