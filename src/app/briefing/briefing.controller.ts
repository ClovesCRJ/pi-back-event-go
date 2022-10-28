import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { BriefingService } from './briefing.service';

@Controller('/api/v1/events/:event_id/briefing')
@ApiTags('Briefing')
export class BriefingController {
  constructor(
    private readonly briefingService: BriefingService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Briefing' })
  @ApiResponse({ status: 200, description: 'Briefing listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, briefing_read: true }
    });
    const event = await this.eventService.findOneBelong({
      relations: [
        "briefing",
        "briefing.event_briefing",
        "briefing.public_briefing",
        "briefing.marketing_briefing",
        "briefing.strategy_briefing",
        "briefing.promotion_briefing",
      ],
      where: { id: permission.event_id },
    });
    return event.briefing;
  }
}
