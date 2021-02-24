import { Request, Response } from 'express';
import {UsersRepository} from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm';

class UserController {

    async create(request: Request, response: Response) {

        const userRepository = getCustomRepository(UsersRepository)

        const { name, email } = request.body;

        const userAlreadyExists =  await userRepository.findOne({
                email
        })

       if(userAlreadyExists){

           const bodyToSend = {
               error: 'User already exist!'
           }
           
           return response.status(400).json(bodyToSend)
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

