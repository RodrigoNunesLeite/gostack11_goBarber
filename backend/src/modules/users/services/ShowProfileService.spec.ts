import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

// describe definimos a categoria do teste
// nesse caso estamos dizendoq que os testes são do
// CreateUser
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  // it é a mesma coisa de test, mas significa isso ou isto
  // Traduzindo...isso deve e a descricao
  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    // Esperando que o objeto gere um id
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
