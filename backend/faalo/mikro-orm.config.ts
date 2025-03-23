import { defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({path: './.env'});
const logger = new Logger('MikroORM');

export default defineConfig({
    entities: ['./dist/src/modules/**/entities/*.entity.js'],  
    entitiesTs: ['./src/modules/**/entities/*.entity.ts'],
    dbName: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    logger: logger.log.bind(logger),
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './migrations',
        transactional: true,
        disableForeignKeys: false,
        allOrNothing: true,
        dropTables: false,
        safe: true,
        emit: 'ts',
    }
});



