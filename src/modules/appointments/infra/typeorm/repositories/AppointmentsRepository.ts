
import { EntityRepository, Repository } from 'typeorm';
//Data TRansfer 

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '../entities/Appointments';
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository {

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = await this.findOne({
            where: { date },
        });

        console.log('repositorie findBydate')

        return findAppointment;
    }

}


export default AppointmentsRepository;
