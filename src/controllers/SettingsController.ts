import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepositories';

class SettingsController {

    async create(request: Request, response: Response) {
        const { userName, chat } = request.body;

        const settingsRepository = getCustomRepository(SettingsRepository);

        const setting = await settingsRepository.findOne({ userName });
        if (setting) {
            return response.status(400).json({
                message: "user already exists!",
            })
        }

        const newSetting = settingsRepository.create({ userName, chat });

        await settingsRepository.save(newSetting);

        return response.status(201).json(newSetting);
    }

}

export { SettingsController };