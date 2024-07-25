
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const DB_USER ="postgres"
const DB_HOST="localhost"
const DB_NAME="invoice"
const DB_PASSWORD="admin"
const DB_PORT="5432"

const sequelize = new Sequelize(
 DB_NAME,
 DB_USER,
 DB_PASSWORD,
  {
    host:DB_HOST,
    port:DB_PORT,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries in console
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;