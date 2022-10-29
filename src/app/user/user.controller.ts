import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

@Controller('api/v1/users')
@ApiTags('Usuários')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário com email e senha' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (senha, email, first_name ou last_name' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return await this.authService.login(user);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Usuário Logado' })
  @ApiResponse({ status: 200, description: 'Usuário logado listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  async findOne(@Req() req: any) {
    return await this.userService.findOneOrFail({
      where: { id: req.user.id },
      select: ['id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at'],
    });
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar usuário' })
  @ApiResponse({ status: 204, description: 'Usuário editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Remover usuário' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(
    @Req() req: any,
  ) {
    return await this.userService.remove(req.user.id);
  }
}
