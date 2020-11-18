import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PlantProcessService } from '../service/plant-process.service';
import { Watering } from '../entity/watering.entity';
import { Spraing } from '../entity/spraing.entity';
import { Feeding } from '../entity/feeding.entity';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { IdentityGuard } from '../guard/identity.guard';

@Controller('plants/:id')
export class PlantProcessController {
  constructor(private plantService: PlantProcessService) {
  }

  @Post('watering')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  watering(@Param('id', ParseIntPipe) id: number): Promise<Watering> {
    return this.plantService.watering(id);
  }

  @Post('spraing')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  spraing(@Param('id', ParseIntPipe) id: number): Promise<Spraing> {
    return this.plantService.spraing(id);
  }

  @Post('feeding')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  feeding(@Param('id', ParseIntPipe) id: number): Promise<Feeding> {
    return this.plantService.feeding(id);
  }
}
