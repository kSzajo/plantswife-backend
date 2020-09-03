import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class Watering {


  @PrimaryGeneratedColumn()
  id: number;


  @Column({type: 'datetime'})
  date: Date

  @ManyToOne(() => Plant, plant => plant.watering)
  plant: Plant;
}
