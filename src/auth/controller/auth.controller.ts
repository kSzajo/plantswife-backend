import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from '../strategy/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { LoginUserDto } from '../../users/dto/login-user.dto';
import { User } from '../../plant/controller/plants.controller';

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
  // this is duplicated to help swagger parse
  async login(@Body() user2: LoginUserDto, @User() user: LoginUserDto) {
    return this.authService.login(user);
  }

}
