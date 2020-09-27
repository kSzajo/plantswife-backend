import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from '../../plant/entity/plant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  name: string;

  @OneToMany(type => Plant, plant => plant.user)
  plant: Plant[];
}
