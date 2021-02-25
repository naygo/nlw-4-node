import { Router } from 'express';

import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SendMailController } from './controllers/SendMailController';

const router = Router();

const userControler = new UserController();
const surveysControler = new SurveysController();
const sendMailController = new SendMailController()

// Users
router.post('/users', userControler.create);

// Surveys
router.get('/surveys', surveysControler.show);
router.post('/surveys', surveysControler.create);

// SurveysUsers
router.post('/sendMail', sendMailController.execute);
router.delete('/sendMail', sendMailController.delete);


export { router };
