import { getRepository } from 'typeorm';
/**
 * O compare bate os dados de senha criptografada com
 * uma senha descriptografada
 */
import { compare } from 'bcryptjs';
/**
 * Verifica se o token é válido
 */
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppErrors';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

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
