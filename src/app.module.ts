import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantsModule } from './plant/plants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      dropSchema: process.env.CREATE_TABLES === 'true',
      // dropSchema: true,
      database: 'Plantswife',
      autoLoadEntities: true,
      // entities: [Plant],
      // synchronize: true,
      synchronize: process.env.CREATE_TABLES === 'true',
      // logging: 'all',
    }),
    PlantsModule,
    AuthModule,
    UsersModule,
    ImageModule,
  ],
})
export class AppModule {}
