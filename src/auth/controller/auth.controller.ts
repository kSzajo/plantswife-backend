import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../strategy/local-auth.guard';

@Controller()
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

}
