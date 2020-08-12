import AppError from '@shared/errors/AppErrors';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

// describe definimos a categoria do teste
// nesse caso estamos dizendoq que os testes são do
// createAppointment
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  // it é a mesma coisa de test, mas significa isso ou isto
  // Traduzindo...isso deve e a descricao
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1232132123',
    });

    // Esperando que o objeto gere um id
    expect(appointment).toHaveProperty('id');

    // Verificando se o provider_id retornado é igual ao enviado
    expect(appointment.provider_id).toBe('1232132123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    /**
     * 10/05/2020 as 11:00, é maio porque no Date
     * janeiro é mes 0
     */
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1232132123',
    });

    /**
     * Aqui espero que o expect seja rejeitado e
     * retorne um erro q é uma instance de AppError
     */
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1232132123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
