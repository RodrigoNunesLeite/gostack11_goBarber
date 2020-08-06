import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUsersTokensRepository;
let resetPassword: ResetPasswordService;

// describe definimos a categoria do teste
// nesse caso estamos dizendoq que os testes são do
// CreateUser
describe('SendForgotPasswordEmail', () => {
  // dispara uma funcao automatica antes de cada um dos testes
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUsersTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  // it é a mesma coisa de test, mas significa isso ou isto
  // Traduzindo...isso deve e a descricao
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    // Esperando que o objeto gere um id
    expect(updatedUser?.password).toBe('123123');
  });
});
