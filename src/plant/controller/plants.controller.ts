import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { PlantDto } from '../dto/plant.dto';
import { PlantsService } from '../service/plants.service';
import { DeleteResult } from 'typeorm';

@Controller('plants')
export class PlantsController {

  constructor(private plantsService: PlantsService) {
  }

  @Get()
  findAll(): Promise<PlantDto[]> {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Plant> {
    return this.plantsService.findOne(id);
  }

  @Post()
  create(@Body() createPlantDto: PlantDto): Promise<Plant> {
    return this.plantsService.create(createPlantDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() plant: Plant): Promise<Plant> {
    return this.plantsService.update(plant);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.plantsService.delete(id);
  }

}

