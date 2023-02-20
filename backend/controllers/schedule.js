const scheduleRouter = require('express').Router();
const Schedule = require('../models/Schedule');
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
  const { date } = request.body;
  const dateToUpdate = await Schedule.findOne({ date });
  const slotToReserve = dateToUpdate.classes.id(request.params.id);
  slotToReserve.slots--;
  await dateToUpdate.save();
  response
    .status(200)
    .json({ success: true, message: 'Class reserved', data: dateToUpdate });
});

scheduleRouter.post('/confirmation', async (request, response) => {
  const emailSent = await sendEmail();
  console.log(emailSent);
  response.status(200).json({ success: true, message: 'Email sent' });
});
module.exports = scheduleRouter;
