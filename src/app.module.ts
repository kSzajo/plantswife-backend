import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerModule } from './flower/flower.module';
import { Flower } from './flower/flower';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwe123zxcasd',
      database: 'Plantswife',
      entities: [Flower],
      synchronize: false,
      logging: 'all'
    }),
    FlowerModule
  ],
})
export class AppModule {}
