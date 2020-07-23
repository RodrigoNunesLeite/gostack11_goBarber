import { startOfHour } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppErrors';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


// o nome aqui da interface é irrelevante
interface IRequest {
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
  constructor(
    private appointmentsRepository: IAppointmentsRepository
  ) {

  }


  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
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
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
