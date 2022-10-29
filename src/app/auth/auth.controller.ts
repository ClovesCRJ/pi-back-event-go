import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleTokenVerificationDto } from './dto/google-token-verification.dto';

@Controller('api/v1/auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login de usuário via email/senha' })
  @ApiResponse({ status: 201, description: 'Usuário logado com sucesso' })
  @ApiResponse({ status: 401, description: 'Email ou senha inválidos' })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('login/google')
  @ApiOperation({ summary: 'Login de usuário via google' })
  @ApiResponse({ status: 201, description: 'Usuário logado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async googleLogin(
    @Body() tokenData: GoogleTokenVerificationDto,
  ) {
    return await this.authService.loginWithGoogle(tokenData.token);
  }
}
