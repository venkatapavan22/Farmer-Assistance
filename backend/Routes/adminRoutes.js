import express  from 'express';
import { AuthenticateAdmin, addAdmin } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/signup',addAdmin);
router.post('/login',AuthenticateAdmin);

export default router;