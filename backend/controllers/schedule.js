const scheduleRouter = require('express').Router();
const Schedule = require('../models/schedule');

scheduleRouter.get('/', async (request, response) => {
  const schedule = await Schedule.find({});
  response.json(schedule);
});

scheduleRouter.post('/', async (request, response) => {
  const { date, classes } = request.body;
  const schedule = new Schedule({
    date,
    classes,
  });
  await schedule.save();
  response.status(201).json(schedule);
});

scheduleRouter.put('/:id', async (request, response) => {
  const { time } = request.body;
  const dateToUpdate = await Schedule.findById({ _id: request.params.id });
  const classToUpdate = dateToUpdate.classes.find((cls) => cls.time === time);
  classToUpdate.slots--;
  await dateToUpdate.save();
  response.status(200).json(dateToUpdate);
});

module.exports = scheduleRouter;
