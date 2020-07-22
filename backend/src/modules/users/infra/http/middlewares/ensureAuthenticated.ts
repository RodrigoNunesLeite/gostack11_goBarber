import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppErrors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validacao token jwt
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer
  // [type, token]
  const [, token] = authHeader.split(' ');

  try {
    // verify retorna no token decodificado, como no site jwt.io
    const decoded = verify(token, authConfig.jwt.secret);

    // no decoded temos o payload
    // as = estou forçando o tipo do decoded
    // o sub guarda o id
    const { sub } = decoded as TokenPayload;

    /**
     * Nesse ponto estou criando uma propriedade user na request,
     * todas as rotas chamadas depois vão ter essas propriedades
     */
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
