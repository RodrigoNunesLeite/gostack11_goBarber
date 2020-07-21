import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // aqui nesse ponto estou dizendo que o retorno da promisse
  // vai ser um appointment ou nulo
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
