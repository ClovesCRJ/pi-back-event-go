import { Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesUtils } from 'src/utils/messages.utils';
import { In } from 'typeorm';
import { EventService } from '../event/event.service';
import { UserService } from '../user/user.service';
import { CreateUserPermissionDto } from './dto/create-user_permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user_permission.dto';
import { UserPermissionService } from './user_permission.service';

@Controller('/api/v1/user-permissions')
@ApiTags('Permissões de Usuário')
export class UserPermissionController {
  constructor(
    private readonly userPermissionService: UserPermissionService,
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Permissões de Usuário' })
  @ApiResponse({ status: 200, description: 'Permissões de Usuário listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  async findAll(
    @Req() req: any,
  ) {
    const events = await this.eventService.findAllBelong(req.user.id);
    const userPermissions = await this.userPermissionService.findAll([
      ...events.map((event) => event.id),
    ]);
    return userPermissions;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Permissão de Usuário' })
  @ApiResponse({ status: 201, description: 'Permissão de Usuário criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Usuário não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (user_id, event_id, briefing_read, briefing_write, check_list_read, check_list_write, costs_read, costs_write, ticket_revenue_read, ticket_revenue_write, event_revenue_read, event_revenue_write, finance_read, finance_write, booking_read, booking_write, tickets_list_read, tickets_list_write, annotation_read, annotation_write)' })
  async create(
    @Req() req: any,
    @Body() createUserPermissionDto: CreateUserPermissionDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: createUserPermissionDto.event_id, owner_id: req.user.id },
    });
    const user = await this.userService.findOneOrFail({
      where: { email: createUserPermissionDto.user_email },
    });
    const userPermission = await this.userPermissionService.findNoOneOrFail({
      where: { user_id: user.id, event_id: event.id },
    })
    return await this.userPermissionService.create(createUserPermissionDto, user.id);
  }

  @Get(':user_permission_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Permissão de Usuário' })
  @ApiResponse({ status: 200, description: 'Permissão de Usuário listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Permissão de Usuário não encontrada' })
  async findOne(
    @Param('user_permission_id') user_permission_id: string,
    @Req() req: any,
  ) {
    const userPermission = await this.userPermissionService.findOne({
      where: { id: user_permission_id },
      relations: ["event"],
    });
    if (userPermission.user_id == req.user.id || userPermission.event.owner_id == req.user.id) {
      return userPermission;
    } else {
      throw new NotFoundException(MessagesUtils.USER_PERMISSION_NOT_FOUND);
    }
  }

  @Put(':user_permission_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Permissão de Usuário' })
  @ApiResponse({ status: 200, description: 'Permissão de Usuário editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Usuário ou Permissão de Usuário não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (user_id, event_id, briefing_read, briefing_write, check_list_read, check_list_write, costs_read, costs_write, ticket_revenue_read, ticket_revenue_write, event_revenue_read, event_revenue_write, finance_read, finance_write, booking_read, booking_write, tickets_list_read, tickets_list_write, annotation_read, annotation_write)' })
  async update(
    @Param('user_permission_id') user_permission_id: string,
    @Req() req: any,
    @Body() updateUserPermissionDto: UpdateUserPermissionDto,
  ) {
    const events = await this.eventService.findAllBelong(req.user.id);
    if ([...events.map(event => event.id)].includes(updateUserPermissionDto.event_id)) {
      const userPermission = await this.userPermissionService.findOne({
        where: {
          id: user_permission_id,
          event_id: updateUserPermissionDto.event_id,
          user_id: updateUserPermissionDto.user_id,
        },
      });
      return await this.userPermissionService.update(userPermission.id, updateUserPermissionDto);
    } else {
      throw new NotFoundException(MessagesUtils.USER_PERMISSION_NOT_FOUND);
    }
  }

  @Delete(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Criar Permissão de Usuário' })
  @ApiResponse({ status: 204, description: 'Permissão de Usuário removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Usuário ou Permissão de Usuário não encontrados' })
  async remove(
    @Param('user_permission_id') user_permission_id: string,
    @Req() req: any,
  ) {
    const events = await this.eventService.findAllBelong(req.user.id);
    const userPermission = await this.userPermissionService.findOne({
      where: { id: user_permission_id, event_id: In([...events.map(event => event.id)]) },
    });
    return await this.userPermissionService.remove(userPermission.id);
  }
}
