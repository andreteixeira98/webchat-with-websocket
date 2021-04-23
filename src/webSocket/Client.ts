import { io } from '../app';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';
//import { Socket } from 'socket.io';


io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();
    let user_id = null;
    console.log("entrou io.on");

    socket.on("client_first_access", async (params) => {
        console.log(params);
        const socket_id = socket.id;
        const { text, email } = params;




        const userAlreadyExists = await usersService.findByEmail(email);

        if (!userAlreadyExists) {
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });
            user_id = user.id;

        } else {
            user_id = userAlreadyExists.id;
            const connection = await connectionsService.findByUserId(userAlreadyExists.id);
            if (!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id: userAlreadyExists.id
                });
            } else {
                connection.socket_id = socket.id;
                await connectionsService.create(connection);
            }

        }



        await messagesService.create({
            user_id,
            text
        });
    });
});