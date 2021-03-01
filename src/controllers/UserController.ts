import { Request, Response } from 'express';
import {UsersRepository} from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup'
import { AppError } from '../errors/AppError';

class UserController {

    async create(request: Request, response: Response) {
        
        const { name, email } = request.body;
        
        const userRepository = getCustomRepository(UsersRepository)

        const schema = yup.object().shape(({
            name: yup.string().required(),
            email: yup.string().email().required()
        }))

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }


        const userAlreadyExists =  await userRepository.findOne({
                email
        })

       if(userAlreadyExists){

        throw new AppError("User does not exists!")
        
        }

        const user = userRepository.create({
            name,
            email,
        })

        await userRepository.save(user)

        return response.status(201).json(user)
    }

}

export { UserController };

