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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { PlantDto } from '../dto/plant.dto';
import { PlantsService } from '../service/plants.service';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { IdentityGuard } from '../guard/identity.guard';
import { User as UserEntity } from '../../users/entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destinationPath, editFileName, imageFileFilter } from '../../image/image/image-util';

export const User = createParamDecorator((data, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});

@Controller('plants')
export class PlantsController {

  constructor(private plantsService: PlantsService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: UserEntity): Promise<PlantDto[]> {
    return this.plantsService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PlantDto> {
    return this.plantsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body(new ValidationPipe()) createPlantDto: PlantDto, @User() user: UserEntity): Promise<Plant> {
    return this.plantsService.create(createPlantDto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() plant: PlantDto): Promise<any> {
    // todo maybe should use validator ad in POST request
    return this.plantsService.update(id, plant);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: number }> {
    return this.plantsService.delete(id);
  }

  @Post(':id/image')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: destinationPath,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async uploadPlantImage(@UploadedFile() file: Express.Multer.File, @User() user: { email: string, name: string, id: number }) {
    return 'success';
  }

}

