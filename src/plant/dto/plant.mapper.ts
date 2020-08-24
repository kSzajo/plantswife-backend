import { CreatePlantDto } from './plant.dto';
import { Plant } from '../entity/plant.entity';

export class PlantMapper {


  public static fromDto(createPlantDto: CreatePlantDto): Partial<Plant> {

    const plant = {
      name: createPlantDto.name,
      notes: createPlantDto.notes,
      place: createPlantDto.place,

      spraing: [{date: createPlantDto.spraing.lastTimeProcessed}],
      watering: [{date: createPlantDto.watering.lastTimeProcessed}],
      feeding: [{date: createPlantDto.feeding.lastTimeProcessed}],

      wateringInterval: createPlantDto.watering.interval,
      feedingInterval: createPlantDto.feeding.interval,
      spraingInterval: createPlantDto.spraing.interval


    }
    console.log(plant)

    return plant as Partial<Plant>




  }
}
