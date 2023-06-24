import Sequelize from 'sequelize';
import dotenv from "dotenv";
import mysql2 from 'mysql2';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    timestamps: false,
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql2,
    port: process.env.PORT,
    logging: false,
    dialectOptions: {
      requestTimeout: 30000,
      encrypt: true
    }
  });

export default sequelize;