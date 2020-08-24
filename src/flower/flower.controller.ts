import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FlowerService } from './flower.service';
import { CreateFlowerDto, Flower } from './flower';

@Controller('flower')
export class FlowerController {

  constructor(private flowerService: FlowerService) {
  }

  @Get()
  findAll() {
    return this.flowerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowerService.findOne(id)
  }

  @Post()
  create(@Body() flower: Flower) {
    return this.flowerService.create(flower);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flower: Flower) {
    return this.flowerService.update(flower);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flowerService.delete(id)
  }

}

