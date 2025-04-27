import express from 'express';
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', chatController.generateResponse);
router.get('/models', chatController.getModels);

export default router;