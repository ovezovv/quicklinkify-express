import express from 'express';
import { getUserLinks, register } from '../controllers/link';
import { validateAndCheckURL } from '../middlewares';

const router = express.Router();

router.post('/short', validateAndCheckURL, register);
router.get('/links/:username', getUserLinks);

export default router;