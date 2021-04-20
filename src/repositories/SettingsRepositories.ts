import { EntityRepository, Repository } from "typeorm";
import { Settings } from "../models/Settings";

@EntityRepository(Settings)
class SettingsRepository extends Repository<Settings>{

}

export { SettingsRepository };