import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  companyid: number;

  @Column()
  department: string;
  @Column()
  name: string;
  @Column()
  title: string;

  @OneToOne(() => Address,{cascade:true})
  @JoinColumn()
  address: Address;  
}
