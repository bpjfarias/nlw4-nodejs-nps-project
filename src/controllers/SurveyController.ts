import { Request, Response } from 'express';
import { SurveysRepository } from '../repositories/SurveysRepository'
import { getCustomRepository } from 'typeorm';

class SurveyController {

    async create(request: Request, response: Response) {

        const { title, description } = request.body

        const surveyRepository = getCustomRepository(SurveysRepository)

        const survey = surveyRepository.create({
            title,
            description
        })

        await surveyRepository.save(survey)

        return response.status(201).json(survey)

    }

    async show(request: Request, response: Response){

        const surveyRepository = getCustomRepository(SurveysRepository)

        const surveys = await surveyRepository.find()

        return response.json(surveys)

    }

}
 
export { SurveyController }