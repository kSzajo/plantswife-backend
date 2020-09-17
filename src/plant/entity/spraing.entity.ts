import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class Spraing {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'datetime'})
  date: Date

  @ManyToOne(() => Plant, plant => plant.spraing, { onDelete: 'CASCADE' })
  plant: Plant;
}
