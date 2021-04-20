import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController';

const router = Router();

const settingsController = new SettingsController();

router.post('/newSetting', settingsController.create);

export default router;