const scheduleRouter = require('express').Router();
const Appointment = require('../models/Appointment');
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const sendEmail = require('../utils/email');

scheduleRouter.get('/', async (request, response) => {
  const schedule = await Schedule.find({}).populate(
    'available',
    'id email firstName image'
  );
  response.json(schedule);
});

scheduleRouter.post('/', async (request, response) => {
  const apptForDate = request.body;
  const employees = await User.find({ role: 'admin' });
  const apptToAdd = apptForDate.map(
    (appt) =>
      new Schedule({
        ...appt,
        available: employees,
      })
  );
  const apptToSave = apptToAdd.map((appt) => appt.save());
  const savedAppts = await Promise.all(apptToSave);
  response
    .status(201)
    .json({ message: 'New schedule added', data: savedAppts });
});

scheduleRouter.put('/:id', async (request, response) => {
  const { appointment, employee } = request.body;
  const bookedAppt = await Appointment.findOne({ _id: appointment });
  const dateToUpdate = await Schedule.findOne({ _id: request.params.id });
  const index = dateToUpdate.available.findIndex(
    (a) => a._id.toString() === employee
  );
  dateToUpdate.available.splice(index, 1);
  dateToUpdate.appointments.push(bookedAppt);
  await dateToUpdate.save();
  const updatedTime = await Schedule.findOne({
    _id: request.params.id,
  }).populate('available', 'id firstName image email');

  response
    .status(200)
    .json({ success: true, message: 'Class reserved', data: updatedTime });
});

scheduleRouter.post('/confirmation', async (request, response) => {
  const { receiver, employee, date, time } = request.body;
  const emailSent = await sendEmail({ receiver, employee, date, time });
  response.status(200).json({ success: true, message: 'Email sent' });
});

module.exports = scheduleRouter;
