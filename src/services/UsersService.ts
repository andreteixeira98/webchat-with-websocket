import { getCustomRepository, Repository } from "typeorm";
import { Users } from "../models/Users";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    private usersRepository: Repository<Users>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }
    async create(email: string) {

        const userAlreadyExists = await this.usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("user already exists!");
        }

        const newUser = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(newUser);

        return newUser;

    }
    async showByUserId(user_id: string) {
        const user = await this.usersRepository.findOne({
            id: user_id
        });
        return user;
    }
    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            email
        });
        return user;
    }
    async showAll(){
        const users = await this.usersRepository.find();
        return users;
    }
}
export { UsersService };