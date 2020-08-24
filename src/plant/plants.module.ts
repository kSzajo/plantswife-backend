import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './entity/plant.entity';
import { FeedingInterval, SpraingInterval, WateringInterval } from './entity/interval.entity';
import { Spraing } from './entity/spraing.entity';
import { Feeding } from './entity/feeding.entity';
import { Watering } from './entity/watering.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Plant,
    Feeding,
    FeedingInterval,
    Spraing,
    SpraingInterval,
    Watering,
    WateringInterval,
  ]),
  ],
  providers: [PlantsService],
  controllers: [PlantsController],
})
export class PlantsModule {
}
