import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({

  imports: [TypeOrmModule.forFeature([
    User,
  ])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
}
