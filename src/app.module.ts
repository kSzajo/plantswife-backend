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
      host: process.env.PLANTS_DATABASE_HOST,
      username: process.env.PLANTS_DATABASE_USERNAME,
      database: process.env.PLANTS_DATABASE_USERNAME,
      password: process.env.PLANTS_DATABASE_PASSWORD,
      type: 'postgres',
      dropSchema: process.env.CREATE_TABLES === 'true',
      // dropSchema: true,
      autoLoadEntities: true,
      // entities: [Plant],
      // synchronize: true,
      synchronize: process.env.CREATE_TABLES === 'true',
      // ssl: { rejectUnauthorized: false },
      // logging: 'all',
    }),
    PlantsModule,
    AuthModule,
    UsersModule,
    ImageModule,
  ],
})
export class AppModule {
}
