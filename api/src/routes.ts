import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

const userControler = new UserController();

router.post('/users', userControler.create);

export { router };