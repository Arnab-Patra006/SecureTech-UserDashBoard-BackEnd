import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address{
    @PrimaryGeneratedColumn()
    addressid:number;

    @Column()
    address:string;
    @Column()
    city:string;
    @Column()
    postalCode:string;
    @Column()
    state:string;
}