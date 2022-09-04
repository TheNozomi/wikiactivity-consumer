import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): { database: TypeOrmModuleOptions } => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
    subscribers: [__dirname + '/../shared/subscribers/*.subscriber{.ts,.js}'],
    synchronize: process.env.TYPEORM_SYNC === 'true',
  },
});
