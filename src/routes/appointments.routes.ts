import {  Router } from 'express';
import { getCustomRepository }  from 'typeorm'
import {  parseISO, isEqual } from 'date-fns';


import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async(request, response) =>{

    console.log('cheou')
    const appointmentsRepository =  getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments)
});

appointmentsRouter.post('/', async (request, response) => {
    console.log('rota appointment')
    try{
    const { provider, date } = request.body;

    const parsedDate = parseISO(date)


    const creteAppointment = new CreateAppointmentService();

    const appointment = await creteAppointment.execute({date:parsedDate, provider});

    return response.json(appointment);
    } catch(err){
        return response.status(400).json({error:err.message})
    }
});
export default appointmentsRouter;
