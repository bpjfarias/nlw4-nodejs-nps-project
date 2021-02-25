import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
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
            return response.status(400).json({
                error: "User doesnt exist!"
            })
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id})

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: "Survey doesnt exist!"
            })
        }

        const npsMailPath = resolve(__dirname,"..", "views", "emails", "npsMail.hbs")

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            user_id: userAlreadyExists.id,
            link: process.env.URL_MAIL
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: userAlreadyExists.id}, { value: null}]
        })

        if(surveyUserAlreadyExists){
            await SendMailService.execute(userAlreadyExists.email, surveyAlreadyExists.title, variables, npsMailPath)        
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: surveyAlreadyExists.id,
        })

        await surveysUsersRepository.save(surveyUser)

        await SendMailService.execute(userAlreadyExists.email, surveyAlreadyExists.title, variables, npsMailPath)        
    }

}

export { SendMailController };

