import { Router } from 'express';
import {register, login, getUser} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUser);

export default router;