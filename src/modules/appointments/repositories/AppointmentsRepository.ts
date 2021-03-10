
import { EntityRepository, Repository } from 'typeorm';
//Data TRansfer Object

import Appointment from '../infra/typeorm/entities/Appointments';
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

    public async findBydate(date: Date): Promise<Appointment | null> {

        const findAppointment = await this.findOne({
            where: { date },
        });

        console.log('repositorie findBydate')

        return findAppointment || null;
    }

}


export default AppointmentsRepository;
