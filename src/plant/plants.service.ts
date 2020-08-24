import { Injectable } from '@nestjs/common';
import { Plant } from './entity/plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePlantDto } from './dto/plant.dto';
import { PlantMapper } from './dto/plant.mapper';

@Injectable()
export class PlantsService {

  constructor(@InjectRepository(Plant)
              private plantRepository: Repository<Plant>) {
  }

  update(plant: Plant): Promise<Plant> {
    return this.plantRepository.save(plant);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.plantRepository.delete(id);
  }

  create(plantDto: CreatePlantDto) {
    return this.plantRepository.save(PlantMapper.fromDto(plantDto));
  }

  findAll(): Promise<Plant[]> {
    return this.plantRepository.query(
      'SELECT id, name, notes, place, spraingInterval, wateringInterval, feedingInterval, feedingDate, spraingDate, wateringDate FROM Plantswife.plant plant\n' +
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
  }

  // SELECT plant.id, name, notes, place, feeding.date FROM Plantswife.plant plant LEFT JOIN Plantswife.feeding feeding ON feeding.plantId = plant.id ;
  findOne(id: string): Promise<Plant> {
    if (Number.isInteger(+id)) {
      return this.plantRepository.query(`SELECT id, name, notes, place, spraingInterval, wateringInterval, feedingInterval, feedingDate, spraingDate, wateringDate FROM Plantswife.plant plant
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

    }
  }

}

// SELECT id, name, notes, date, place  FROM Plantswife.plant plant
// JOIN
// (
//   SELECT plantId, MAX(date) as date FROM Plantswife.feeding feed group by plantId
// ) as most_recent
// ON plant.id = most_recent.plantId
// ;


// SELECT id, name, notes, place, spraingInterval, wateringInterval, feedingInterval, feedingDate, spraingDate, wateringDate FROM Plantswife.plant plant
// JOIN
// (
//   SELECT plantId, MAX(date) as feedingDate FROM Plantswife.feeding feed group by plantId
// ) as most_recent1
// ON plant.id = most_recent1.plantId
//
// JOIN
// (
//   SELECT plantId, MAX(date) as wateringDate FROM Plantswife.watering feed group by plantId
// ) as most_recent2
// ON plant.id = most_recent2.plantId
//
//
// JOIN
// (
//   SELECT plantId, MAX(date) as spraingDate FROM Plantswife.spraing feed group by plantId
// ) as most_recent3
// ON plant.id = most_recent3.plantId
