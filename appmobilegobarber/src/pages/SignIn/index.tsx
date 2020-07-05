import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

/**
 * como tenho 3 arquivos iguais com tamanhos diferentes,
 * ele usa automaticamente o que mais se adere a minha tela
 */
import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu logon</Title>
      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => { }}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
