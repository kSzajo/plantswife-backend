import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PlantProcessService } from '../service/plant-process.service';
import { Watering } from '../entity/watering.entity';
import { Spraing } from '../entity/spraing.entity';
import { Feeding } from '../entity/feeding.entity';

@Controller('plants/:id')
export class PlantProcessController {
  constructor(private plantService: PlantProcessService) {
  }

  @Post('watering')
  watering(@Param('id', ParseIntPipe) id: number): Promise<Watering> {
    return this.plantService.watering(id);
  }

  @Post('spraing')
  spraing(@Param('id', ParseIntPipe) id: number): Promise<Spraing> {
    return this.plantService.spraing(id);
  }

  @Post('feeding')
  feeding(@Param('id', ParseIntPipe) id: number): Promise<Feeding> {
    return this.plantService.feeding(id);
  }
}
