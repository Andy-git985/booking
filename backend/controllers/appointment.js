const appointmentRouter = require('express').Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

appointmentRouter.post('/', async (request, response) => {
  const { date, time, client, employee } = request.body;
  const clientToBook = await User.findOne({ _id: client });
  const employeeToBook = await User.findOne({ _id: employee });
  const newAppt = new Appointment({
    date,
    time,
    client: clientToBook,
    employee: employeeToBook,
  });
  await newAppt.save();
  response.status(201).json({
    message: 'Appointment successfully reserved',
    data: newAppt,
  });
});

module.exports = appointmentRouter;
