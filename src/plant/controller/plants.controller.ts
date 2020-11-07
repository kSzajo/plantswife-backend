import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Plant } from '../entity/plant.entity';
import { PlantDto } from '../dto/plant.dto';
import { PlantsService } from '../service/plants.service';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { IdentityGuard } from '../guard/identity.guard';
import { User as UserEntity } from '../../users/entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destinationPath, editFileName, imageFileFilter } from '../../image/image-util';
import { ImageService } from '../../image/image.service';
import { LoggedUserModel } from '../../users/model/logged-user.model';


export const User = createParamDecorator((data, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});

@Controller('plants')
export class PlantsController {

  constructor(private plantsService: PlantsService,
              private imageService: ImageService) {
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
  async uploadPlantImage(@UploadedFile() uploadedImage: Express.Multer.File, @User() user: LoggedUserModel, @Param('id', ParseIntPipe) plantId: number): Promise<string> {
    this.imageService.cleanUsersImageDirectory(user, plantId, uploadedImage.filename);
    return 'success';
  }

  @Get(':id/image')
  @UseGuards(JwtAuthGuard, IdentityGuard)
  getImage(@User() user: { email: string, name: string, id: number }, @Res() response: Response, @Param('id', ParseIntPipe) plantId: number): void {
    const foundImage = this.imageService.getUserImagePlant(user, plantId);
    if (foundImage) {
      response.sendFile(foundImage.filename, { root: foundImage.rootPath });
    } else {
      throw new NotFoundException(`Image for plantid:${plantId} not found for user ${user.id}`);
    }
  }

}

