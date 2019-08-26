import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionConntroller';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sesions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
