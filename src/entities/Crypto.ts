import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn()
  cryptoid: number;

  @Column()
  coin: string;
  @Column()
  wallet: string;
  @Column()
  network: string;
}
