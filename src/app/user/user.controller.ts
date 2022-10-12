import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe) id: string) {
    return await this.userService.findOneOrFail({
      where: { id },
      select: ['id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at'],
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id', new ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }
}
