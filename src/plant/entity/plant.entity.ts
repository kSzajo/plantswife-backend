import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Spraing } from './spraing.entity';
import { Watering } from './watering.entity';
import { Feeding } from './feeding.entity';
import { ProcessInterval } from '../dto/processInterval.enum';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Plant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  notes: string;

  @Column()
  place: string;

  @OneToMany(() => Spraing, spraing => spraing.plant, { cascade: true })
  spraing: Spraing[];

  @OneToMany(() => Watering, watering => watering.plant, { cascade: true })
  watering: Watering[];

  @OneToMany(() => Feeding, feeding => feeding.plant, { cascade: true })
  feeding: Feeding[];

  @Column({ type: 'date' })
  nextSpraing: Date;

  @Column({ type: 'date' })
  nextFeeding: Date;

  @Column({ type: 'date' })
  nextWatering: Date;

  @Column({
    type: 'enum',
    enum: ProcessInterval,
    default: ProcessInterval.EVERYDAY,
  })
  spraingInterval: ProcessInterval;

  @Column({
    type: 'enum',
    enum: ProcessInterval,
    default: ProcessInterval.EVERYDAY,
  })
  feedingInterval: ProcessInterval;

  @Column({
    type: 'enum',
    enum: ProcessInterval,
    default: ProcessInterval.EVERYDAY,
  })
  wateringInterval: ProcessInterval;

  @ManyToOne(() => User, user => user.plant)
  @JoinColumn()
  user: User;
}


