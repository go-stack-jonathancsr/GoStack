import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionConntroller';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sesions', SessionController.store);

export default routes;
