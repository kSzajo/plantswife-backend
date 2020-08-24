import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Plant } from './plant.entity';


export abstract class Interval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  seconds: string;

  @UpdateDateColumn()
  updatedDate: Date;
}

@Entity()
export class SpraingInterval extends Interval {
  @ManyToOne(type => Plant, plant => plant.spraingInterval)
  plant: Plant;

}

@Entity()
export class FeedingInterval extends Interval {
  @ManyToOne(type => Plant, plant => plant.feedingInterval)
  plant: Plant;
}

@Entity()
export class WateringInterval extends Interval {
  @ManyToOne(type => Plant, plant => plant.wateringInterval)
  plant: Plant;
}

