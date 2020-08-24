import { Module } from '@nestjs/common';
import { FlowerController } from './flower.controller';
import { FlowerService } from './flower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './flower';

@Module({
  imports: [TypeOrmModule.forFeature([Flower]),
  ],
  providers: [FlowerService],
  controllers: [FlowerController],
})
export class FlowerModule {
}
