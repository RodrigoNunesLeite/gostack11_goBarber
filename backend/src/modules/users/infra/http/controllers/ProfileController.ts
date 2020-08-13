import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

console.log('message1');
export default class ProfileController {
  // Rota para mostrar o perfil do usuario
  public async show(request: Request, response: Response): Promise<Response> {
    console.log('show');
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    // esse comando deleta a propriedade password do
    // objeto user, evitando que retorne na resposta
    // do create
    delete user.password;

    return response.json(user);
  }
}
