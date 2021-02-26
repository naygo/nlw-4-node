import { Router } from 'express';

import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const router = Router();

const userControler = new UserController();
const surveysControler = new SurveysController();
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

// Users
router.post('/users', userControler.create);

// Surveys
router.get('/surveys', surveysControler.show);
router.post('/surveys', surveysControler.create);

// SendMail
router.post('/sendMail', sendMailController.execute);

// Answers
router.get('/answers/:value', answerController.create);

// NPS
router.get('/nps/:survey_id', npsController.execute);


export { router };
