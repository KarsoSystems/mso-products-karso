import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  host: process.env.DB_HOST,
  port: '',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
}));
