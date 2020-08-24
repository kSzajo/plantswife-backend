import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plant } from './entity/plant.entity';
import { CreatePlantDto } from './dto/plant.dto';

@Controller('plant')
export class PlantsController {

  constructor(private plantsService: PlantsService) {
  }

  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id)
  }

  @Post()
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() plant: Plant) {
    return this.plantsService.update(plant);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.plantsService.delete(id)
  }

}

