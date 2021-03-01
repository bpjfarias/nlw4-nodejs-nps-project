import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {

    async execute(request: Request, response: Response) {

        const { survey_id } = request.params

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const totalAnswers = surveysUsers.length

        const detractors = surveysUsers
            .filter((surveyUser) => surveyUser.value >= 0 && surveyUser.value <= 6)
            .length

        const promoters = surveysUsers
            .filter((surveyUser) => surveyUser.value >= 9 && surveyUser.value <= 10)
            .length

        const npsNumber = Number(((promoters - detractors) / totalAnswers * 100).toFixed(2))

        return response.json({
            detractors,
            promoters,
            totalAnswers,
            npsNumber
        })

    }
}
export { NpsController }
