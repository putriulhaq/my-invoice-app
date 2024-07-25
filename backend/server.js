import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import { syncModels } from "./models/tables.js"
import invoiceRouter from './router/invoice.js';
import routerProduct from './router/product.js';
const port = 3000

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json())
app.use('/api', invoiceRouter )
app.use('/api/product', routerProduct )

const checkDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await checkDatabaseConnection()
    await syncModels()
  });