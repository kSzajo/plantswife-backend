import { PlantDto } from './plant.dto';
import { Plant } from '../entity/plant.entity';
import * as _ from 'lodash';
import { Watering } from '../entity/watering.entity';
import { Spraing } from '../entity/spraing.entity';
import { Feeding } from '../entity/feeding.entity';
import { plainToClass } from 'class-transformer';

export class DestructuredPlantDTO {
  plant?: Partial<Plant>;
  watering?: Partial<Watering>;
  spraing?: Partial<Spraing>;
  feeding?: Partial<Feeding>;
}

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

  public static fromDTOToEntities(id: number, plantDto: Partial<PlantDto>): DestructuredPlantDTO {
    // todo create util to handle stripping of undefined fields
    //     also strippingEmptyArrays const plantWithoutEmptyArrays = _.omitBy(plantWithoutUndefinedFileds, _.isEmpty)

    let plant: Partial<Plant> = {
      name: plantDto.name,
      notes: plantDto.notes,
      place: plantDto.place,

      wateringInterval: plantDto.watering?.interval,
      feedingInterval: plantDto.feeding?.interval,
      spraingInterval: plantDto.spraing?.interval,

      nextSpraing: plantDto.spraing?.nextTimeProcessed,
      nextFeeding: plantDto.feeding?.nextTimeProcessed,
      nextWatering: plantDto.watering?.nextTimeProcessed,
    };

    plant = _.pickBy(plant, _.identity);
    plant.id = id;
    const plantToUpdate: Plant = plainToClass(Plant, plant);

    let watering: Partial<Watering> = plantDto.watering?.lastTimeProcessed && {
      plant: plantToUpdate,
      date: plantDto.watering.lastTimeProcessed,
    };
    watering = _.pickBy(watering, _.identity);
    const wateringToUpdate = plainToClass(Watering, watering);

    let feeding: Partial<Feeding> = plantDto.feeding?.lastTimeProcessed && {
      plant: plantToUpdate,
      date: plantDto.feeding?.lastTimeProcessed,
    };
    feeding = _.pickBy(feeding, _.identity);
    const feedingUpdate: Feeding = plainToClass(Feeding, feeding);

    let spraing: Partial<Spraing> = plantDto.spraing?.lastTimeProcessed && {
      plant: plantToUpdate,
      date: plantDto.spraing?.lastTimeProcessed,
    };
    spraing = _.pickBy(spraing, _.identity);
    const spraingUpdate: Spraing = plainToClass(Spraing, spraing);

    return _.pickBy({
      plant: plantToUpdate,
      watering: wateringToUpdate,
      spraing: spraingUpdate,
      feeding: feedingUpdate,
    } as DestructuredPlantDTO, _.identity);
  }

  public static fromDTOToEntity(plantDto: PlantDto): Partial<Plant> {
    // where should we assert that plantDto is not malformed?
    return {
      name: plantDto.name,
      notes: plantDto.notes,
      place: plantDto.place,

      spraing: [{ date: plantDto.spraing.lastTimeProcessed }] as Spraing[],
      watering: [{ date: plantDto.watering.lastTimeProcessed }] as Watering[],
      feeding: [{ date: plantDto.feeding.lastTimeProcessed }] as Feeding[],

      wateringInterval: plantDto.watering.interval,
      feedingInterval: plantDto.feeding.interval,
      spraingInterval: plantDto.spraing.interval,

      nextSpraing: plantDto.spraing.nextTimeProcessed,
      nextFeeding: plantDto.feeding.nextTimeProcessed,
      nextWatering: plantDto.watering.nextTimeProcessed,
    };

  }
}
