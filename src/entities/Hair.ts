import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hair {
  @PrimaryGeneratedColumn()
  hairid: number;
  
  @Column()
  color: string;
  @Column()
  type: string;
}
