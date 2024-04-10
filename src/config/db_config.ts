import { DataSource } from "typeorm";


const AppDataSource=new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"postgres",
    database:"securetech_db",
    entities:["src/entities/*{.ts,.js}"],
    synchronize:true,
    logging:true
});

export default AppDataSource;