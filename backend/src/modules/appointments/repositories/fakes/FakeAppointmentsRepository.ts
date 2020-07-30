// Aqui vamos criar as mesmas funções do appointmentrepository
// mas sem a conexão com o typeorm

// Vamos armazenar os dados apenas com javascript

import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  // aqui nesse ponto estou dizendo que o retorno da promisse
  // vai ser um appointment ou nulo
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });
    /*
    O object.assign faz a mesma coisa q é feita abaixo

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;
    */

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
