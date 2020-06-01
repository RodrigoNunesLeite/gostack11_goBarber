/**
 * .d = de definição de tipos
 * Aqui vamos definir a tipagem da propriedade user,
 * que estamos acrescendo no request, assim que inicia a sessão
 *
 * declare namespace Express = para sobrescrever uma tipagem dentro
 * do express
 *
 * export interface Request = Estou sobrescrevendo a exportação
 * do request que ja existe no express, mas ele não apaga o que
 * já existe, apenas acrescenta
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
