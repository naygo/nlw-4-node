import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { resolve } from 'path';

import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';


class SendMailController {

    async execute(req: Request, res: Response) {
        
        const { email, survey_id } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Verificação de usuário e de pesquisa
        const user = await usersRepository.findOne({ email });
        if(!user) {
            return res.status(400).json({
                error: 'User does not exists'
            });
        }

        const survey = await surveysRepository.findOne({ id: survey_id });
        if(!survey) {
            return res.status(400).json({
                error: 'Survey does not exists'
            });
        }

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }
        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{ user_id: user.id }, { value: null }],
            relations: ['user', 'survey']
        });
        if(surveyUserAlreadyExists) {
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }

        // Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        
        // Enviar e-mail para o usuário
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return res.json(surveyUser);
    }

    
    async delete(req: Request, res: Response) {
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const all = await surveysUsersRepository.find();
        const deleted = await surveysUsersRepository.remove(all);

        return res.json(all);
    }
}

export { SendMailController };
