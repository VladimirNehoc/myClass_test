import express from 'express';
import dotenv from 'dotenv';

import { sequelize } from '../config/database';
import './models'

import lessonRoutes from './routes/lessonRoutes';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use('/lessons', lessonRoutes);

sequelize.authenticate()
  .catch((error) => {
    console.error('Sequelize authenticate error:', error);
  });

sequelize.sync({ alter: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`The server is running on the port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Sequelize sync error:', error);
  });
