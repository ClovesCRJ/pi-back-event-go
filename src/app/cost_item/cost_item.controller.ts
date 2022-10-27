import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CostListService } from '../cost_list/cost_list.service';
import { EventService } from '../event/event.service';
import { CostItemService } from './cost_item.service';
import { CreateCostItemDto } from './dto/create-cost_item.dto';
import { UpdateCostItemDto } from './dto/update-cost_item.dto';

@Controller('/api/v1/events/:event_id/cost-lists/:cost_list_id/cost-items')
@ApiTags('Cost Item')
export class CostItemController {
  constructor(
    private readonly costItemService: CostItemService,
    private readonly eventService: EventService,
    private readonly costListService: CostListService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Custos de uma Categoria de Custos' })
  @ApiResponse({ status: 200, description: 'Custos listados com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Custos não encontrados' })
  async findAll(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.findAll(cost_list.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Custo' })
  @ApiResponse({ status: 200, description: 'Custo criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Custos não encontrados' })
  async create(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
    @Body() createCostItemDto: CreateCostItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return this.costItemService.create(cost_list.id, createCostItemDto);
  }

  @Get(':cost_item_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Lista Custo' })
  @ApiResponse({ status: 200, description: 'Custo listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Custos ou Custo não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Param('cost_item_id') cost_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.findOne({
      where: { id: cost_item_id, cost_list_id: cost_list.id },
    });
  }

  @Put(':cost_item_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Custo' })
  @ApiResponse({ status: 200, description: 'Custo editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Custos ou Custo não encontrados' })
  async update(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Param('cost_item_id') cost_item_id: string,
    @Req() req: any,
    @Body() updateCostItemDto: UpdateCostItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.update(
      cost_item_id,
      cost_list.id,
      updateCostItemDto,
    );
  }

  @Delete(':cost_item_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Custo' })
  @ApiResponse({ status: 200, description: 'Custo removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento, Categoria de Custos ou Custo não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Param('cost_item_id') cost_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.remove(cost_item_id, cost_list.id);
  }
}
