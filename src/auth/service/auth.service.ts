import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entity/user.entity';
import { LoginUserDto } from '../../users/dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.getByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('Username or password is incorrect');
    }
    const userEnteredCorrectPassword: boolean = await this.verifyPassword(loginUserDto.password, user.password);
    if (userEnteredCorrectPassword) {
      // we get rid of password field from object this way
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto): Promise<{ access_token: string }> {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(registrationData: CreateUserDto): Promise<User> {
    const user = await this.usersService.getByEmail(registrationData.email);
    if (user) {
      throw new BadRequestException('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser: User = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new BadRequestException('Error occurred during registration');
    }
  }

  public async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
  }
}
