import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Spraing } from './spraing.entity';
import { Watering } from './watering.entity';
import { Feeding } from './feeding.entity';

@Entity()
export class Plant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  notes: string

  @Column()
  place: string

  @OneToMany(type => Spraing, spraing => spraing.plant, {cascade: true, })
  spraing: Spraing[]

  @OneToMany(type => Watering, watering => watering.plant, {cascade: true, })
  watering: Watering[]

  @OneToMany(type => Feeding, feeding => feeding.plant, {cascade: true, })
  feeding: Feeding[]

  @Column()
  spraingInterval: string

  @Column()
  feedingInterval: string

  @Column()
  wateringInterval: string

}


