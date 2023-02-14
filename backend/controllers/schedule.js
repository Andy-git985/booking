const scheduleRouter = require('express').Router();
const Schedule = require('../models/schedule');
const sendEmail = require('../utils/email');

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
  // const { time } = request.body;
  // const dateToUpdate = await Schedule.findById({ id: request.params.id });
  // const classToUpdate = dateToUpdate.classes.find((cls) => cls.time === time);
  // classToUpdate.slots--;
  // await dateToUpdate.save();
  // response.status(200).json(dateToUpdate);
  const emailSent = await sendEmail();
  console.log(emailSent);
});

module.exports = scheduleRouter;
