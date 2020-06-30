import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

// coloco em volta dos lugares que quero que tenha acesso ao contexto
// AuthContext.Provider

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Rodrigo' }}>
      <SignIn />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
);

export default App;
