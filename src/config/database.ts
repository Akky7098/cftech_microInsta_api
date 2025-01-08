import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
  process.env.DB_NAME!, 
  process.env.DB_USER!, 
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql', 
    logging: false, 
    define: {
      timestamps: false, 
    },
    pool: {
      max: 5,
      min: 0, 
      acquire: 30000, 
      idle: 10000, 
    },
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
