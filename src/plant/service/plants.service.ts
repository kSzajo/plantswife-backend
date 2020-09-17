import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { PlantDto } from '../dto/plant.dto';
import { DestructuredPlantDTO, PlantMapper } from '../dto/plant.mapper';
import { Feeding } from '../entity/feeding.entity';
import { Watering } from '../entity/watering.entity';
import { Spraing } from '../entity/spraing.entity';

@Injectable()
export class PlantsService {

  constructor(@InjectRepository(Plant) private plantRepository: Repository<Plant>,
              private connection: Connection) {
  }

  async update(id: number, plantDto: PlantDto): Promise<any> {
    const destructuredPlantDTO: DestructuredPlantDTO = PlantMapper.fromDTOToEntities(id, plantDto);

    const plantToUpdate: Partial<Plant> = destructuredPlantDTO.plant;
    const wateringUpdate: Partial<Watering> = destructuredPlantDTO.watering;
    const feedingUpdate: Partial<Feeding> = destructuredPlantDTO.feeding;
    const spraingUpdate: Partial<Spraing> = destructuredPlantDTO.spraing;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(plantToUpdate);
      wateringUpdate.date && await queryRunner.manager.save(wateringUpdate);
      spraingUpdate.date && await queryRunner.manager.save(spraingUpdate);
      feedingUpdate.date && await queryRunner.manager.save(feedingUpdate);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Received malformed data');
    } finally {
      await queryRunner.release();
    }
    return 'success';
  }

  async delete(id: number): Promise<{ deleted: number }> {
    const result: DeleteResult = await this.plantRepository.delete(id);
    return { deleted: result.affected };

  }

  create(plantDto: PlantDto): Promise<Plant> {
    return this.plantRepository.save(PlantMapper.fromDTOToEntity(plantDto));
  }

  async findAll(): Promise<PlantDto[]> {
    // bug? plants in DB must have at least 1 record of each process (watering/spraing/feeding)
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
