import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { PlantDto } from '../dto/plant.dto';
import { PlantsService } from '../service/plants.service';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { IsItYourPlantGuard } from './is-it-your-plant-guard.service';

export const User = createParamDecorator((data, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});

@Controller('plants')
export class PlantsController {

  constructor(private plantsService: PlantsService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard, IsItYourPlantGuard)
  findAll(@User() user: any): Promise<PlantDto[]> {
    //todo find all for current user
    return this.plantsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, IsItYourPlantGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PlantDto> {
    return this.plantsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, IsItYourPlantGuard)
  create(@Body(new ValidationPipe()) createPlantDto: PlantDto): Promise<Plant> {
    return this.plantsService.create(createPlantDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, IsItYourPlantGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() plant: PlantDto): Promise<any> {
    // todo maybe should use validator ad in POST request
    return this.plantsService.update(id, plant);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsItYourPlantGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: number }> {
    return this.plantsService.delete(id);
  }

}

