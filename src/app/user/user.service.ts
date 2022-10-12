import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'email', 'first_name', 'last_name', 'created_at', 'deleted_at', 'updated_at']
    });
  }

  async findOneOrFail(options: FindOneOptions<User>) {
    try {
      return await this.usersRepository.findOneOrFail({
        ...options, 
        select: ['id', 'email', 'first_name', 'last_name', 'created_at', 'deleted_at', 'updated_at']
      });
    } catch (error) {
      throw new NotFoundException(MessagesUtils.USER_NOT_FOUND);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.findOneOrFail({ where: { id } });
    return await this.usersRepository.softDelete({ id });
  }
}
