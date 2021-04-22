import { Router } from 'express'
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const router = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

router.post('/newSetting', settingsController.create);
router.post('/newUser', usersController.create);
router.post('/newMessage', messagesController.create);
router.get('/messages/:user_id', messagesController.showByUser);


export default router;