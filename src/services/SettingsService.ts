import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepositories";


class SettingsService {

    async create(chat: boolean, userName: string) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const settingAlreadyExists = await settingsRepository.findOne({ userName });
        if (settingAlreadyExists) {
            throw new Error('Setting Already Exists!');
        }

        const newSetting = settingsRepository.create(
            {
                userName,
                chat
            });

        await settingsRepository.save(newSetting);

        return newSetting;
    }


}

export { SettingsService };
