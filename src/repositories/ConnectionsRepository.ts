import { EntityRepository, Repository } from "typeorm";
import { Connections } from "../models/Connections";

@EntityRepository(Connections)
class ConnectionsRepository extends Repository<Connections>{

}
export { ConnectionsRepository };