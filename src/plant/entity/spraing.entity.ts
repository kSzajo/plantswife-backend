import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class Spraing {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date

  @ManyToOne(() => Plant, plant => plant.spraing, { onDelete: 'CASCADE' })
  plant: Plant;
}
