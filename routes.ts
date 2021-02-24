import { Router } from 'express'
import { SurveyController } from './src/controllers/SurveyController'
import { UserController } from './src/controllers/UserController'
const userController = new UserController()
const surveyController = new SurveyController()

const router = Router()

router.post("/users", userController.create)
router.post("/surveys", surveyController.create)

router.get("/surveys", surveyController.show)

export { router }