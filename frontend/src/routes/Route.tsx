/**
 * Esse arquivo foi criado para controlar o acesso as rotas,
 * verificando se o usuário está logando, se tem acesso, etc..
 */
import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/**
 * Recebendo a propriedade isPrivate e definindo false
 * como valor inicial
 *
 * ...rest = Se trata dos demais parametros recebidos
 */
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  // se user tiver dados, significa que o usuário está
  // autenticado na aplicação
  const { user } = useAuth();

  // o render nos permite alterar a logistica de como
  // os componentes são renderizados
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // true/true = OK
        // true/false = Redirecionar ele pro login
        // false/true = Redirecionar para o dashboard
        // false/false = OK
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: location },
              }}
            />
          );
      }}
    />
  );
};

export default Route;
