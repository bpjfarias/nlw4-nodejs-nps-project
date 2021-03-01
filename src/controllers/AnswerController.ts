import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    async execute(request:Request, response: Response){

        const surveyUser_id  = request.query.id

        const {value} = request.params

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            id: String(surveyUser_id)
        })

        if(!surveyUserAlreadyExists){
            throw new AppError("Survey User does not exists!")
        }

        surveyUserAlreadyExists.value = Number(value)

        await surveysUsersRepository.save(surveyUserAlreadyExists)

        return response.status(200).json(surveyUserAlreadyExists)

    }

}

export {AnswerController}