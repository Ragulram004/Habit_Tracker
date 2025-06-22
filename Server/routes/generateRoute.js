import express from 'express';
import { generatedSuggestion } from '../controller/suggestsionController.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

router.post('/', generatedSuggestion);

export default router;