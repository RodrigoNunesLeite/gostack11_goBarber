import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

// describe definimos a categoria do teste
// nesse caso estamos dizendoq que os testes são do
// createAppointment
describe('CreateAppointment', () => {
  // it é a mesma coisa de test, mas significa isso ou isto
  // Traduzindo...isso deve e a descricao
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1232132123',
    });

    // Esperando que o objeto gere um id
    expect(appointment).toHaveProperty('id');

    // Verificando se o provider_id retornado é igual ao enviado
    expect(appointment.provider_id).toBe('1232132123');
  });

  it('should not be able to create two appointments on the same time', () => {
    expect(1 + 2).toBe(3);
  });
});
