import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './entity/plant.entity';
import { Spraing } from './entity/spraing.entity';
import { Feeding } from './entity/feeding.entity';
import { Watering } from './entity/watering.entity';
import { PlantProcessService } from './service/plant-process.service';
import { PlantsService } from './service/plants.service';
import { PlantProcessController } from './controller/plant-process.controller';
import { PlantsController } from './controller/plants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Plant,
    Feeding,
    Spraing,
    Watering,
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
