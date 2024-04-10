import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Bank } from "./Bank";
import { Company } from "./Company";
import { Crypto } from "./Crypto";
import { Hair } from "./Hair";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  maidenName: string;
  @Column()
  age: number;
  @Column()
  gender: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  birthDate: string;
  @Column()
  image: string;
  @Column()
  bloodGroup: string;
  @Column()
  height: number;
  @Column({ type: "float" })
  weight: number;
  @Column()
  eyeColor: string;

  @OneToOne(() => Hair, {
    cascade: true,
  })
  @JoinColumn()
  hair: Hair;

  @OneToOne(() => Address, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

  @OneToOne(() => Bank, {
    cascade: true,
  })
  @JoinColumn()
  bank: Bank;

  @OneToOne(() => Company, {
    cascade: true,
  })
  @JoinColumn()
  company: Company;

  @OneToOne(() => Crypto, {
    cascade: true,
  })
  @JoinColumn()
  crypto: Crypto;

  @Column()
  domain: string;
  @Column()
  ip: string;
  @Column()
  macAddress: string;
  @Column()
  university: string;
  @Column()
  ein: string;
  @Column()
  ssn: string;
  @Column()
  userAgent: string;
}
