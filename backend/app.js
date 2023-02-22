const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const scheduleRouter = require('./controllers/schedule');
const usersRouter = require('./controllers/user');

logger.info('connecting to', config.MONGODB_URI);
mongoose.set('strictQuery', false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);

app.use('/user', middleware.userExtractor, usersRouter);
app.use('/api/schedule', middleware.userExtractor, scheduleRouter);
app.use(middleware.errorHandler);

module.exports = app;
