import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../strategy/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../strategy/jwt-auth.guard';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return typeof req;
  }

}
