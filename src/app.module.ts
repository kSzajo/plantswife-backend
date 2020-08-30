import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantsModule } from './plant/plants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwe123zxcasd',
      database: 'Plantswife',
      autoLoadEntities: true,
      // entities: [Plant],
      synchronize: true,
      logging: 'all'
    }),
    PlantsModule
  ],
})
export class AppModule {}
