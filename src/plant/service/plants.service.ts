import { BadRequestException, Injectable } from '@nestjs/common';
import { Plant } from '../entity/plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { PlantDto, PlantResponseDto } from '../dto/plant.dto';
import { DestructuredPlantDTO, PlantMapper } from '../dto/plant.mapper';
import { Feeding } from '../entity/feeding.entity';
import { Watering } from '../entity/watering.entity';
import { Spraing } from '../entity/spraing.entity';
import { User } from '../../users/entity/user.entity';

@Injectable()
export class PlantsService {

  constructor(@InjectRepository(Plant) private plantRepository: Repository<Plant>,
              @InjectRepository(Watering) private wateringRepository: Repository<Watering>,
              @InjectRepository(Spraing) private spraingRepository: Repository<Spraing>,
              @InjectRepository(Feeding) private feedingRepository: Repository<Feeding>,
              private plantMapper: PlantMapper,
              private connection: Connection) {
  }

  async update(plantId: number, plantDto: PlantDto): Promise<any> {
    const destructuredPlantDTO: DestructuredPlantDTO = this.plantMapper.fromDTOToEntities(plantId, plantDto);

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

  create(plantDto: PlantDto, user: User): Promise<Plant> {
    const toSave = {
      ...this.plantMapper.fromDTOToEntity(plantDto),
      user: user,
    };
    return this.plantRepository.save(toSave);
  }

  async findAll(user: User): Promise<PlantResponseDto[]> {
    const userId = Number(user.id);
    if (Number.isNaN(userId)) {
      throw new BadRequestException('User id is not number!');
    }

    const allUserPlants = await this.plantRepository.createQueryBuilder('plant')
      .where('"plant"."userId" = :id', { id: user.id })
      .leftJoinAndSelect(
        qb =>
          qb.from(Watering, 'watering')
            .select('MAX(date)', 'wateringDate')
            .addSelect('"plantId"', 'wateringPlantId')
            .groupBy('"wateringPlantId"'), 'mostRecentWatering', '"mostRecentWatering"."wateringPlantId"="plant"."id"',
      )
      .leftJoinAndSelect(
        qb =>
          qb.from(Spraing, 'spraing')
            .select('MAX(date)', 'spraingDate')
            .addSelect('"plantId"', 'spraingPlantId')
            .groupBy('"spraingPlantId"'), 'mostRecentSpraing', '"mostRecentSpraing"."spraingPlantId"="plant"."id"',
      )
      .leftJoinAndSelect(
        qb =>
          qb.from(Spraing, 'feeding')
            .select('MAX(date)', 'feedingDate')
            .addSelect('"plantId"', 'feedingPlantId')
            .groupBy('"feedingPlantId"'), 'mostRecentFeeding', '"mostRecentFeeding"."feedingPlantId"="plant"."id"',
      )
      .getRawMany();

    const removeLowerDashFromKeys = (obj) => {
      const withRemovedLowerDash = {};
      for (const [key, value] of Object.entries(obj)) {
        const keySplit = key.split('_');
        if (keySplit.length == 2) {
          withRemovedLowerDash[keySplit[1]] = value;
        } else {
          withRemovedLowerDash[key] = value;
        }
      }
      return withRemovedLowerDash;
    };

    return allUserPlants
      .map(record => this.plantMapper.fromQueryResultToDTO(removeLowerDashFromKeys(record), userId))
      .sort((a, b) => a.id - b.id);
  }

  async findOne(plantId: number): Promise<PlantResponseDto> {
    const foundPlant = await this.plantRepository.findOne({ id: plantId }, { relations: ['user'] });

    const getByLatestDate: FindManyOptions<Watering | Spraing | Feeding> = {
      select: ['date'],
      where: {
        plant: foundPlant,
      },
      order: {
        date: 'DESC',
      },
      take: 1,
    };

    const latestWatering = await this.wateringRepository.find(getByLatestDate);
    const latestSpraing = await this.spraingRepository.find(getByLatestDate);
    const latestFeeding = await this.feedingRepository.find(getByLatestDate);

    const result = {
      ...foundPlant,
      spraingDate: latestSpraing[0]['date'],
      feedingDate: latestFeeding[0]['date'],
      wateringDate: latestWatering[0]['date'],
    };

    return this.plantMapper.fromQueryResultToDTO(result, +foundPlant.user.id);
  }

  async isPlantOwner(param: { plantId: number; userId: string }): Promise<boolean> {
    const foundPlant: Plant = await this.plantRepository.findOne(param.plantId, { relations: ['user'] });
    return foundPlant?.user?.id === param.userId;
  }
}

