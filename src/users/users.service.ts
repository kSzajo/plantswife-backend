import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {


  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async getByEmail(email: string): Promise<User | undefined> {
    console.log(email);
    const foundUser: User = await this.userRepository.findOne({ email: email });
    if (foundUser) {
      return foundUser;
    } else {
      return null;
    }

  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

}
