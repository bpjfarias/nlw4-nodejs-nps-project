import { Router } from 'express'
import { AnswerController } from './src/controllers/AnswerController'
import { NpsController } from './src/controllers/NpsController'
import { SendMailController } from './src/controllers/SendMailController'
import { SurveyController } from './src/controllers/SurveyController'
import { UserController } from './src/controllers/UserController'

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()


const router = Router()

router.post("/users", userController.create)

router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)

router.post("/sendMail", sendMailController.execute)

router.post('/answers/:value', answerController.execute)

router.get('/nps/:survey_id', npsController.execute)


export { router }

