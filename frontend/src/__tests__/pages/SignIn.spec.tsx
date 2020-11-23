import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// mocamos o funcionamento da funcao useHistory
// reactNode = é qualquer valor que uma variável pode receber
jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('shoud be able to sign in', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
