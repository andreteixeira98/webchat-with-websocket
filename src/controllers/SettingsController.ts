import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {

    async create(request: Request, response: Response) {
        const { userName, chat } = request.body;
        const settingsService = new SettingsService();
        try {

            const newSetting = await settingsService.create(chat, userName);

            return response.status(201).json(newSetting);

        } catch (err) {
            return response.status(400).json({
                message: err.message
            })
        }
    }
    async findByUserName(request: Request, response: Response) {
        const { userName } = request.params;
        const settingsService = new SettingsService();
        const setting = await settingsService.findByUserName(userName);

        return response.json(setting);
    }
    async update(request: Request, response: Response) {

        try {
            const { userName } = request.params;
            const { chat } = request.body;
            const settingsService = new SettingsService();

            const updatedSetting = await settingsService.update(userName, chat);
            return response.json(updatedSetting);
        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }


    }

}

export { SettingsController };
