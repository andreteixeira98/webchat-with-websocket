import { response } from "express";
import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface dataMessage {
    admin_id?: string,
    user_id: string,
    text: string;
}
class MessagesService {

    async create({ admin_id = null, user_id, text }: dataMessage) {

        try {

            const messagesRepository = getCustomRepository(MessagesRepository);

            const newMessage = messagesRepository.create({
                admin_id,
                user_id,
                text
            });

            await messagesRepository.save(newMessage);

            return newMessage;

        } catch (error) {
            throw new Error(error.message);
        }



    }
    async showByUser(user_id: string) {
        const messagesRepository = getCustomRepository(MessagesRepository);
        const messages = await messagesRepository.find({
            user_id
        });
        return messages;
    }
}

export { MessagesService };
