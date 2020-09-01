import { Module } from '@nestjs/common';
import { PlantsController } from './controller/plants.controller';
import { PlantsService } from './service/plants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './entity/plant.entity';
import { FeedingInterval, SpraingInterval, WateringInterval } from './entity/interval.entity';
import { Spraing } from './entity/spraing.entity';
import { Feeding } from './entity/feeding.entity';
import { Watering } from './entity/watering.entity';
import { PlantProcessController } from './controller/plantProcess.controller';
import { PlantProcessService } from './service/plantProcess.service';

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
  providers: [
    PlantsService,
    PlantProcessService,
  ],
  controllers: [
    PlantsController,
    PlantProcessController,
  ],
})
export class PlantsModule {
}
