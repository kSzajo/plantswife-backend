import { Injectable, NotFoundException } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watering } from '../entity/watering.entity';
import { Feeding } from '../entity/feeding.entity';
import { Spraing } from '../entity/spraing.entity';
import { ProcessInterval } from '../dto/processInterval.enum';
import * as moment from 'moment';
import { unitOfTime } from 'moment';

@Injectable()
export class PlantProcessService {

  constructor(@InjectRepository(Watering) private wateringRepository: Repository<Watering>,
              @InjectRepository(Spraing) private spraingRepository: Repository<Spraing>,
              @InjectRepository(Plant) private plantRepository: Repository<Plant>,
              @InjectRepository(Feeding) private feedingRepository: Repository<Feeding>) {
  }

  private calculateNextProcess(lastDate: Date, interval: ProcessInterval): Date {
    const intervalsMap = new Map<ProcessInterval, { amount: number, unit: unitOfTime.Base }>([
      [ProcessInterval.EVERYDAY, { amount: 1, unit: 'd' }],
      [ProcessInterval.ONCE_A_WEEK, { amount: 1, unit: 'w' }],
      [ProcessInterval.TWICE_A_WEEK, { amount: 3, unit: 'd' }],
      [ProcessInterval.THREE_TIMES_A_WEEK, { amount: 2, unit: 'd' }],
      [ProcessInterval.ONCE_A_MONTH, { amount: 1, unit: 'M' }],
    ]);

    const intervalMomentData = intervalsMap.get(interval);
    return moment(lastDate).add(intervalMomentData.amount, intervalMomentData.unit).toDate();

  }

  async watering(id: number): Promise<any> {
    const plant = await this.plantRepository.findOne(id);
    if (!plant) throw new NotFoundException('Plant not found');

    const watering = new Watering();
    watering.date = new Date();
    watering.plant = plant;

    plant.nextWatering = this.calculateNextProcess(watering.date, plant.wateringInterval);

    // this should be transactional, update only after successful save
    await this.wateringRepository.save(watering);
    await this.plantRepository.update(id, plant);
    return 'success';
  }

  async spraing(id: number): Promise<any> {
    const plant = await this.plantRepository.findOne(id);
    if (!plant) throw new NotFoundException('Plant not found');

    const spraing = new Spraing();
    spraing.date = new Date();
    spraing.plant = plant;

    plant.nextSpraing = this.calculateNextProcess(spraing.date, plant.spraingInterval);
    // this should be transactional, update only after successful save
    await this.spraingRepository.save(spraing);
    await this.plantRepository.update(id, plant);
    return 'success';

  }

  async feeding(id: number): Promise<any> {
    const plant = await this.plantRepository.findOne(id);
    if (!plant) throw new NotFoundException('Plant not found');

    const feeding = new Feeding();
    feeding.date = new Date();
    feeding.plant = plant;

    plant.nextFeeding = this.calculateNextProcess(feeding.date, plant.feedingInterval);
    // this should be transactional, update only after successful save
    await this.feedingRepository.save(feeding);
    await this.plantRepository.update(id, plant);
    return 'success';

  }


}
