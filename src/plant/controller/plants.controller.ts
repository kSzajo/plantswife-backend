import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { PlantDto } from '../dto/plant.dto';
import { PlantsService } from '../service/plants.service';

@Controller('plants')
export class PlantsController {

  constructor(private plantsService: PlantsService) {
  }

  @Get()
  findAll(): Promise<PlantDto[]> {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PlantDto> {
    return this.plantsService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) createPlantDto: PlantDto): Promise<Plant> {
    return this.plantsService.create(createPlantDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() plant: Plant): Promise<Plant> {
    return this.plantsService.update(plant);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: number }> {
    return this.plantsService.delete(id);
  }

}

