import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppErrors';

// o nome aqui da interface é irrelevante
interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Dependency inversion
 */
/**
 * Como se trata de um async, nós retornamos uma promisse
 * e dentro do <> da Promisse, nós colocamos o tipo
 * de retorno dessa promise
 */

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    /**
     * O .create só cria uma instancia do objeto, mas não
     * salva no banco.
     *
     * o .save salva os dados no banco
     */
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
