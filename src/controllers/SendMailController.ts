import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {

    async execute(request : Request, response: Response) {

        const { email, survey_id } = request.body

        const userRepository = getCustomRepository(UsersRepository)

        const surveyRepository = getCustomRepository(SurveysRepository)

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await userRepository.findOne({email})

        if(!userAlreadyExists){
            throw new AppError("User doesnt exist!")
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id})

        if(!surveyAlreadyExists){
            throw new AppError("Survey doesnt exist!")
        }

        const npsMailPath = resolve(__dirname,"..", "views", "emails", "npsMail.hbs")

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            surveyUser_id: undefined,
            link: process.env.URL_MAIL
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id, value: null}
        })

        if(surveyUserAlreadyExists){
            variables.surveyUser_id = surveyUserAlreadyExists.id
            await SendMailService.execute(userAlreadyExists.email, surveyAlreadyExists.title, variables, npsMailPath)        
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: surveyAlreadyExists.id,
        })

        await surveysUsersRepository.save(surveyUser)

        variables.surveyUser_id=surveyUser.id;

        await SendMailService.execute(userAlreadyExists.email, surveyAlreadyExists.title, variables, npsMailPath)        
    }

}

export { SendMailController };

