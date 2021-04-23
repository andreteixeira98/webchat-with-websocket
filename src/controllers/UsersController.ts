import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UsersController {
    async create(request: Request, response: Response) {

        try {
            const { email } = request.body;
            const usersService = new UsersService();
            const user = await usersService.create(email);

            return response.status(201).json(user);

        } catch (error) {
            return response.status(400).json({
                err: error.message
            });
        }
    }
    async showByUserId(request: Request, response: Response) {
        const { user_id } = request.body;
        const usersService = new UsersService();
        const user = await usersService.showByUserId(user_id);

        return response.json(user);
    }
    async showAll(request: Request, response: Response){
        const usersService = new UsersService();
        const users = await usersService.showAll();
        return response.json(users);
    }


}

export { UsersController };
