import express from 'express';
const router = express.Router();
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', getCategories);
router.post('/', auth, upload.single('image'), createCategory);
router.put('/:id', auth, upload.single('image'), updateCategory);
router.delete('/:id', auth, deleteCategory);

export default router;
