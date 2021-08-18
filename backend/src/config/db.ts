import { Sequelize } from 'sequelize';
import CONSTANT from './CONSTANT';

export default new Sequelize(CONSTANT.POSTGRES_DB, CONSTANT.POSTGRES_USER, CONSTANT.POSTGRES_PASSWORD, {
  host: CONSTANT.POSTGRES_HOST,
  port: CONSTANT.POSTGRES_PORT,
  dialect: 'postgres'
});
