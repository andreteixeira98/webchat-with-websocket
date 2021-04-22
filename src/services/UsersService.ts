import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    async create(email: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("user already exists!");
        }

        const newUser = usersRepository.create({
            email
        });

        await usersRepository.save(newUser);

        return newUser;

    }
}
export { UsersService };