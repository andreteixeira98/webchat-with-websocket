import { getCustomRepository, IsNull, Repository } from "typeorm";
import { Messages } from "../models/Messages";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface dataMessage {
    admin_id?: string,
    user_id: string,
    text: string;
}
class MessagesService {
    private messagesRepository: Repository<Messages>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, user_id, text }: dataMessage) {

        try {


            const newMessage = this.messagesRepository.create({
                admin_id,
                user_id,
                text
            });

            await this.messagesRepository.save(newMessage);

            return newMessage;

        } catch (error) {
            throw new Error(error.message);
        }



    }
    async showByUserId(user_id: string) {

        const messages = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });
        return messages;
    }

    async showAllMessagesWithoutAdmin() {
        const messages = await this.messagesRepository.find({
            where: { admin_id: IsNull() }
        })

        return messages;

    }
}

export { MessagesService };
