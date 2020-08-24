import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  lastWatering: string;

}


export class CreateFlowerDto {
  lastWatering: string;
}
