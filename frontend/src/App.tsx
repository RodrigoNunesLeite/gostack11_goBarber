import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

// coloco em volta dos lugares que quero que tenha acesso ao contexto
// AuthContext.Provider

// Router = para rotas
// Routes = tem a configuração das minhas rotas
// AppProvider = possui a configurar dos meus hooks ou context

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
