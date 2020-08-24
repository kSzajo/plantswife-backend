import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class Feeding {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'datetime'})
  date: string

  @ManyToOne(type => Plant, plant => plant.feeding)
  plant: Plant;
}
