import express from 'express';
// import { verifyUser } from '../Middlewares/verifyToken.js';
import { addConversation, getConversations } from '../Controllers/messageController.js';


const router = express.Router();

router.post('/createMessage',addConversation);
router.get('/getMessages',getConversations);

export default router;