import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CostItemService } from '../cost_item/cost_item.service';
import { EventService } from '../event/event.service';
import { CostListService } from './cost_list.service';
import { CreateCostListDto } from './dto/create-cost_list.dto';
import { UpdateCostListDto } from './dto/update-cost_list.dto';

@Controller('/api/v1/events/:event_id/cost-lists')
@ApiTags('Cost List')
export class CostListController {
  constructor(
    private readonly costListService: CostListService,
    @Inject(forwardRef(() => CostItemService))
    private readonly costItemService: CostItemService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Categoria de Custos' })
  @ApiResponse({ status: 201, description: 'Categoria de Custos criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCostListDto: CreateCostListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
  async update(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
    @Body() updateCostListDto: UpdateCostListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
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
  @ApiResponse({ status: 200, description: 'Categoria de Custos removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Categoria de Custos não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      relations: ["cost_items"],
      where: { id: cost_list_id, event_id: event.id },
    });
    for (const cost_item in cost_list.cost_items) {
      if (Object.prototype.hasOwnProperty.call(cost_list.cost_items, cost_item)) {
        const item = cost_list.cost_items[cost_item];
        await this.costItemService.remove(item.id, cost_list.id);
      }
    }
    return await this.costListService.remove(cost_list_id);
  }
}
