import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantsModule } from './plant/plants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dropSchema: process.env.CREATE_TABLES === 'true',
      database: 'Plantswife',
      autoLoadEntities: true,
      // entities: [Plant],
      synchronize: process.env.CREATE_TABLES === 'true' || false,
      // logging: 'all',
    }),
    PlantsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
