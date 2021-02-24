import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userControler = new UserController();
const surveysControler = new SurveysController();

router.post('/users', userControler.create);

router.get('/surveys', surveysControler.show);
router.post('/surveys', surveysControler.create);

export { router };
