import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.get('/', async (request, response) => {

    console.log(request.user)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments)
});

appointmentsRouter.post('/', async (request, response) => {
    console.log('rota appointment')

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date)


    const creteAppointment = new CreateAppointmentService();

    const appointment = await creteAppointment.execute({ date: parsedDate, provider_id });

    return response.json(appointment);

});
export default appointmentsRouter;
