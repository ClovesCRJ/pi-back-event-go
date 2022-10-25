import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login de usuário via email/senha' })
  @ApiResponse({ status: 200, description: 'Usuário logado com sucesso' })
  @ApiResponse({ status: 401, description: 'Email ou senha inválidos' })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
