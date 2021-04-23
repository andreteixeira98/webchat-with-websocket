import { getCustomRepository, Repository } from "typeorm";
import { Settings } from "../models/Settings";
import { SettingsRepository } from "../repositories/SettingsRepositories";


class SettingsService {
    private settingsRepository: Repository<Settings>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create(chat: boolean, userName: string) {
        

        const settingAlreadyExists = await this.settingsRepository.findOne({ userName });
        if (settingAlreadyExists) {
            throw new Error('Setting Already Exists!');
        }

        const newSetting = this.settingsRepository.create(
            {
                userName,
                chat
            });

        await this.settingsRepository.save(newSetting);

        return newSetting;
    }


}

export { SettingsService };
