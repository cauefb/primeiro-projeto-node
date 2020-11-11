import { request, response, Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/',(request, response) =>{
    const appointments = appointmentRepository.all();
    return response.json(appointments)
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentRepository.findBydate(parsedDate);


    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentRepository.create({
        provider,
        date: parsedDate,
    });


    return response.json(appointment);
});
export default appointmentsRouter;
