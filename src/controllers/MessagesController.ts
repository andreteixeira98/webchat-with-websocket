import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {

    async create(request: Request, response: Response) {

        try {
            const { admin_id, user_id, text } = request.body;
            const messagesService = new MessagesService();
            const newMessage = await messagesService.create({
                admin_id,
                user_id,
                text
            });
            return response.status(201).json(newMessage);
        } catch (error) {
            return response.status(400).json({
                message: error.message
            })

        }
    }
    async showByUser(request: Request, response: Response) {
        const { user_id } = request.params;

        const messagesService = new MessagesService();

        const messages = await messagesService.showByUser(user_id);

        if (!messages) {
            return response.status(404).json({
                message: 'no message found'
            });
        }
        return response.json(messages);
    }

}

export { MessagesController };