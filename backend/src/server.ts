import 'reflect-metadata';
import express from 'express';
// o routes aqui se torna um middleware
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Executando');
});
