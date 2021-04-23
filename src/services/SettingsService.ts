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
    async findByUserName(userName: string) {
        const setting = await this.settingsRepository.findOne({ userName });
        return setting;
    }
    async update(userName: string, chat: boolean) {
        const settingAlreadyExists = await this.settingsRepository.findOne({
            userName
        });

        if (!settingAlreadyExists) {
            throw new Error("unregistered userName!");

        }
        const updatedSetting = await this.settingsRepository.createQueryBuilder()
            .update(Settings)
            .set({ chat, updated_at: Date.now() })
            .where("username = :username", {
                username: userName
            })
            .execute();

        return updatedSetting;
    }



}

export { SettingsService };
