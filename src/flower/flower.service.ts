import { Injectable } from '@nestjs/common';
import { Flower } from './flower';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class FlowerService {

  constructor(@InjectRepository(Flower)
              private flowerRepository: Repository<Flower>) {
  }

  update(flower: Flower): Promise<Flower> {
    return this.flowerRepository.save(flower);

  }

  delete(id: string): Promise<DeleteResult> {
    return this.flowerRepository.delete(id);
  }

  create(flower: Flower) {
    return this.flowerRepository.save(flower);
  }

  findAll(): Promise<Flower[]> {
    return this.flowerRepository.find();
  }

  findOne(id: string): Promise<Flower> {
    return this.flowerRepository.findOne(id);
  }
}
