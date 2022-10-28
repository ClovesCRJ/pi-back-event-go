import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CostItemService } from '../cost_item/cost_item.service';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { CostListService } from './cost_list.service';
import { CreateCostListDto } from './dto/create-cost_list.dto';
import { UpdateCostListDto } from './dto/update-cost_list.dto';

@Controller('/api/v1/events/:event_id/cost-lists')
@ApiTags('Categoria de Custos')
export class CostListController {
  constructor(
    private readonly costListService: CostListService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Categoria de Custos' })
  @ApiResponse({ status: 201, description: 'Categoria de Custos criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCostListDto: CreateCostListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, costs_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.costListService.create(event.id, createCostListDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categorias de Custos' })
  @ApiResponse({ status: 200, description: 'Categorias de Custos listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, costs_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.costListService.findAll(event.id);
  }

  @Get(':cost_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Categoria de Custos' })
  @ApiResponse({ status: 200, description: 'Categoria de Custos listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Custos não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, costs_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.costListService.findOne({
      relations: ["cost_items"],
      where: { id: cost_list_id, event_id: event.id },
    });
  }

  @Put(':cost_list_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Categoria de Custos' })
  @ApiResponse({ status: 200, description: 'Categoria de Custos editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Custos não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (name)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
    @Body() updateCostListDto: UpdateCostListDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, costs_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.costListService.update(
      event.id,
      cost_list_id,
      updateCostListDto,
    );
  }

  @Delete(':cost_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Categoria de Custos' })
  @ApiResponse({ status: 204, description: 'Categoria de Custos removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Custos não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, costs_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const cost_list = await this.costListService.findOne({
      relations: ["cost_items"],
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costListService.remove(cost_list.id);
  }
}
