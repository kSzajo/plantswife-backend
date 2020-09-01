import { Injectable } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watering } from '../entity/watering.entity';
import { Feeding } from '../entity/feeding.entity';
import { Spraing } from '../entity/spraing.entity';

@Injectable()
export class PlantProcessService {

  constructor(@InjectRepository(Watering) private wateringRepository: Repository<Watering>,
              @InjectRepository(Spraing) private spraingRepository: Repository<Spraing>,
              @InjectRepository(Feeding) private feedingRepository: Repository<Feeding>) {
  }

  watering(id: number): Promise<Watering> {
    const plant = new Plant();
    plant.id = id;

    const watering = new Watering();
    watering.date = new Date();
    watering.plant = plant;

    return this.wateringRepository.save(watering);
  }

  spraing(id: number): Promise<Spraing> {
    const plant = new Plant();
    plant.id = id;

    const spraing = new Spraing();
    spraing.date = new Date();
    spraing.plant = plant;

    return this.spraingRepository.save(spraing);
  }

  feeding(id: number): Promise<Feeding> {
    const plant = new Plant();
    plant.id = id;

    const feeding = new Feeding();
    feeding.date = new Date();
    feeding.plant = plant;

    return this.feedingRepository.save(feeding);
  }


}
