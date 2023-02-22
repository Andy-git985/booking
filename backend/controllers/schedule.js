const scheduleRouter = require('express').Router();
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const sendEmail = require('../utils/email');

scheduleRouter.get('/', async (request, response) => {
  // const schedule = await Schedule.find({})
  //   .select('classes')
  //   .populate('slots', 'email');
  // const schedule = await Schedule.find({}).populate({
  //   path: 'classes',
  //   populate: {
  //     path: 'slots',
  //     model: 'User',
  //   },
  // });
  const schedule = await Schedule.find({}).populate('available', 'id email');
  response.json(schedule);
});

scheduleRouter.post('/', async (request, response) => {
  // const { date, classes } = request.body;
  const apptForDate = request.body;
  const employees = await User.find({ role: 'admin' });
  const apptToAdd = apptForDate.map(
    (appt) =>
      new Schedule({
        ...appt,
        available: employees,
      })
  );
  console.log('apptToAdd', apptToAdd);
  const apptToSave = apptToAdd.map((appt) => appt.save());
  i;
  const savedAppts = await Promise.all(apptToSave);
  response.status(201).json(savedAppts);

  // const employees = await User.find({ role: 'admin' });
  // const classesWithEmployeesAdded = classes.map((c) => {
  //   return { ...c, available: employees };
  // });
  // const schedule = new Schedule({
  //   date,
  //   classes: classesWithEmployeesAdded,
  // });
  // await schedule.save();
  // response.status(201).json(schedule);

  // const { date, classes } = request.body;
  // const employees = await User.find({ role: 'admin' });
  // const classesWithEmployeesAdded = classes.map((c) => {
  //   return { ...c, slots: employees };
  // });
  // const schedule = new Schedule({
  //   date,
  //   classes: classesWithEmployeesAdded,
  // });
  // await schedule.save();
  // response.status(201).json(schedule);
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
