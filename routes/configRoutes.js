import express from 'express';
const router = express.Router();
import {
    getConfig,
    updateConfig,
} from '../controllers/configController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', getConfig);
router.put('/', auth, upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 }
]), updateConfig);

export default router;
