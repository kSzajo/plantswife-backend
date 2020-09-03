import { PlantDto } from './plant.dto';
import { Plant } from '../entity/plant.entity';

export class PlantMapper {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static fromQueryResultToDTO(plant: any): PlantDto {

    return {
      id: plant.id,
      name: plant.name,
      notes: plant.notes,
      place: plant.place,
      watering: {
        interval: plant.wateringInterval,
        lastTimeProcessed: plant.wateringDate,
        nextTimeProcessed: plant.nextWatering,
      },
      spraing: {
        interval: plant.spraingInterval,
        lastTimeProcessed: plant.spraingDate,
        nextTimeProcessed: plant.nextSpraing,
      },
      feeding: {
        interval: plant.feedingInterval,
        lastTimeProcessed: plant.feedingDate,
        nextTimeProcessed: plant.nextFeeding,
      },
    } as PlantDto;
  }

  public static fromDTOToEntity(plantDto: PlantDto): Partial<Plant> {

    const plant = {
      name: plantDto.name,
      notes: plantDto.notes,
      place: plantDto.place,

      spraing: [{ date: plantDto.spraing.lastTimeProcessed }],
      watering: [{ date: plantDto.watering.lastTimeProcessed }],
      feeding: [{ date: plantDto.feeding.lastTimeProcessed }],

      wateringInterval: plantDto.watering.interval,
      feedingInterval: plantDto.feeding.interval,
      spraingInterval: plantDto.spraing.interval,

      nextSpraing: plantDto.spraing.nextTimeProcessed,
      nextFeeding: plantDto.feeding.nextTimeProcessed,
      nextWatering: plantDto.watering.nextTimeProcessed,
    };

    return plant as Partial<Plant>;
  }
}
