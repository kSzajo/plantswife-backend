import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class Feeding {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date

  @ManyToOne(() => Plant, plant => plant.feeding, { onDelete: 'CASCADE' })
  plant: Plant;
}
