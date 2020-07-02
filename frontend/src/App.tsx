import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

// coloco em volta dos lugares que quero que tenha acesso ao contexto
// AuthContext.Provider

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
