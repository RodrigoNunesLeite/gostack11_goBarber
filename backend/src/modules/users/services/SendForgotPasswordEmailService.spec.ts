// import AppError from '@shared/errors/AppErrors';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

// describe definimos a categoria do teste
// nesse caso estamos dizendoq que os testes são do
// CreateUser
describe('SendForgotPasswordEmail', () => {
  // it é a mesma coisa de test, mas significa isso ou isto
  // Traduzindo...isso deve e a descricao
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    // Esperando que o objeto gere um id
    expect(sendMail).toHaveBeenCalled();
  });
});
