
/**
 * O compare bate os dados de senha criptografada com
 * uma senha descriptografada
 */
import { compare } from 'bcryptjs';
/**
 * Verifica se o token é válido
 */
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';


import AppError from '@shared/errors/AppErrors';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {


    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password = Senha criptografada
    // password = Senha não-criptografada, enviada na hora do login
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /**
     * O sign não precisa do wait porque é um método que retorna
     * uma string e não uma promisse
     *
     * Passamos informações do usuário que posso usar depois
     * Não podemos colocar a senha, pois não é seguro, aqui
     * é o payload.
     * O segundo parametro é uma chave secreta, um secret que só
     * nossa aplicação conheça, podemos gerar essa string no
     * md5online
     * O terceiro parametro são configurações
     * - o subject é sempre o id do usuario que gerou o token
     * - expiresIn é quanto tempo o token vai durar
     */

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
