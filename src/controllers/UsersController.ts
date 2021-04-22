import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UsersController {
    async create(request: Request, response: Response) {


        try {
            const { email } = request.body;
            const userService = new UsersService();

            const user = await userService.create(email);

            return response.status(201).json(user);

        } catch (error) {
            return response.status(400).json({
                err: error.message
            });
        }
    }
}

export { UsersController };
