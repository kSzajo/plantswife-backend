import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from '../strategy/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('auth/register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
