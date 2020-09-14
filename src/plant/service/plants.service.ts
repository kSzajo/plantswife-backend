import { Injectable, NotFoundException } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PlantDto } from '../dto/plant.dto';
import { PlantMapper } from '../dto/plant.mapper';

@Injectable()
export class PlantsService {

  constructor(@InjectRepository(Plant) private plantRepository: Repository<Plant>) {
  }

  update(plant: Plant): Promise<Plant> {
    return this.plantRepository.save(plant);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.plantRepository.delete(id);
  }

  create(plantDto: PlantDto): Promise<Plant> {
    return this.plantRepository.save(PlantMapper.fromDTOToEntity(plantDto));
  }

  async findAll(): Promise<PlantDto[]> {
    const result: any[] = await this.plantRepository.query(
      'SELECT id, name, notes, place, spraingInterval, wateringInterval, feedingInterval, feedingDate, spraingDate, wateringDate, nextSpraing, nextFeeding, nextWatering FROM Plantswife.plant plant\n' +
      'JOIN\n' +
      '(\n' +
      '  SELECT plantId, MAX(date) as feedingDate FROM Plantswife.feeding feed group by plantId\n' +
      ') as most_recent1\n' +
      'ON plant.id = most_recent1.plantId\n' +
      '\n' +
      'JOIN\n' +
      '(\n' +
      '  SELECT plantId, MAX(date) as wateringDate FROM Plantswife.watering feed group by plantId\n' +
      ') as most_recent2\n' +
      'ON plant.id = most_recent2.plantId\n' +
      '\n' +
      '\n' +
      'JOIN\n' +
      '(\n' +
      '  SELECT plantId, MAX(date) as spraingDate FROM Plantswife.spraing feed group by plantId\n' +
      ') as most_recent3\n' +
      'ON plant.id = most_recent3.plantId\n',
    );

    return result.map(record => PlantMapper.fromQueryResultToDTO(record));
  }

  async findOne(id: number): Promise<PlantDto> {
    if (Number.isInteger(+id)) {
      const record: Array<any> = await this.plantRepository.query(`SELECT id, name, notes, place, spraingInterval, wateringInterval, feedingInterval, feedingDate, spraingDate, wateringDate,  nextSpraing, nextFeeding, nextWatering  FROM Plantswife.plant plant
JOIN
(
  SELECT plantId, MAX(date) as feedingDate FROM Plantswife.feeding feed group by plantId
) as most_recent1
ON plant.id = most_recent1.plantId

JOIN
(
  SELECT plantId, MAX(date) as wateringDate FROM Plantswife.watering feed group by plantId
) as most_recent2
ON plant.id = most_recent2.plantId


JOIN
(
  SELECT plantId, MAX(date) as spraingDate FROM Plantswife.spraing feed group by plantId
) as most_recent3
ON plant.id = most_recent3.plantId
where id=${id}`);
      if (record.length > 1) {
        throw new Error('Find 1 should return only 1 record');
      }
      if (record.length === 0) {
        throw new NotFoundException('not found plant with id: ' + id);
      }
      return PlantMapper.fromQueryResultToDTO(record[0]);
    }


  }

}
