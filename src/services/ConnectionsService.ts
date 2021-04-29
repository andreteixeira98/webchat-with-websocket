import { getCustomRepository, Repository } from 'typeorm';
import { Connections } from '../models/Connections';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';
import { UsersService } from '../services/UsersService';

interface connectionTypes {
    id?: string;
    user_id: string;
    admin_id?: string;
    socket_id: string;

}
class ConnectionsService {
    private connectionsRepository: Repository<Connections>;

    constructor() {

        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }
    async create({ id, user_id, admin_id = null, socket_id }: connectionTypes) {
        const usersService = new UsersService();
        const userAlreadyExists = await usersService.showByUserId(user_id);
        if (!userAlreadyExists) {
            throw new Error("unregistered user!");
        }

        const newConnection = this.connectionsRepository.create({
            id,
            user_id,
            admin_id,
            socket_id
        });

        await this.connectionsRepository.save(newConnection);

        return newConnection;
    }
    async findById(id: string) {
        const connection = await this.connectionsRepository.findOne({
            id
        });

        return connection;
    }
    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({
            user_id
        });

        return connection;
    }
    async findBySocketId(socket_id: string) {
        const connection = await this.connectionsRepository.findOne({
            socket_id
        });

        return connection;
    }

    async showAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });

        return connections;

    }
    async updateAdminByUserId(user_id: string, admin_id: string) {
        await this.connectionsRepository.createQueryBuilder()
            .update(Connections)
            .set({ admin_id })
            .where("user_id = :user_id", {
                user_id
            })
            .execute();
    }
}

export { ConnectionsService };