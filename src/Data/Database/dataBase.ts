import config from 'config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    `sqlite:
    ${config.get('database.localPath')}
    ${config.get('database.localFile')}`,
);

export default sequelize;