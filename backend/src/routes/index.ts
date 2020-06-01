import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

/**
 * Quando eu utilizo o use nas routas, significa que qualquer
 * rota que inicie com appointments, vai passar por esse ponto
 * e depois vai para o appointments.routes
 */
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
