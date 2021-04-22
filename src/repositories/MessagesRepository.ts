import { EntityRepository, Repository } from "typeorm";
import { Messages } from "../models/Messages";

@EntityRepository(Messages)
class MessagesRepository extends Repository<Messages>{

}
export { MessagesRepository };