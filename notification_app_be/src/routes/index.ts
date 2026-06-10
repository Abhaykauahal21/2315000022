import { Router } from 'express';
import { getAllNotifications, getPriorityNotifications } from '../controllers/notification.controller';

const router = Router();

router.get('/notifications', getAllNotifications);
router.get('/priority', getPriorityNotifications);

export default router;
