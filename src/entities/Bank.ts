import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  bankid: number;
  
  @Column()
  cardExpire: string;
  @Column()
  cardNumber: string;
  @Column()
  cardType: string;
  @Column()
  currency: string;
  @Column()
  iban: string;
}
