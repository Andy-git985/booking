const scheduleRouter = require('express').Router();
const Schedule = require('../models/schedule');

scheduleRouter.post('/', async (request, response) => {
  const { date, classes } = request.body;
  const schedule = new Schedule({
    date,
    classes,
  });
  await schedule.save();
  response.status(201).json(schedule);
});

module.exports = scheduleRouter;
