import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'rootroot',
  database: process.env.DB_NAME || 'covid_timeline',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'ture',
}));
