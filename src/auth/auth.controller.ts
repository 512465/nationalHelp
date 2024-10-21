import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth/auth.guard';
// import { Public } from './contants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: Record<string, any>) {
    return this.authService.signIn(loginDto.loginId, loginDto.code);
  }

  @Post('code')
  set(@Body() loginId: string) {
    return this.authService.set(loginId);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return {
      data: req.user,
    };
  }

  // @Public()
  @Get()
  findAll() {
    return [];
  }
}
