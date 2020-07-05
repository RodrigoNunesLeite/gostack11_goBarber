import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

/**
 * como tenho 3 arquivos iguais com tamanhos diferentes,
 * ele usa automaticamente o que mais se adere a minha tela
 */
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu logon</Title>
    </Container>
  );
};

export default SignIn;
