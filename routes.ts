import { Router } from 'express'
import { SendMailController } from './src/controllers/SendMailController'
import { SurveyController } from './src/controllers/SurveyController'
import { UserController } from './src/controllers/UserController'
const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()


const router = Router()

router.post("/users", userController.create)

router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)

router.post("/sendMail", sendMailController.execute)


export { router }