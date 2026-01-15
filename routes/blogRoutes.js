import express from 'express';
const router = express.Router();
import {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} from '../controllers/blogController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', auth, upload.single('image'), createBlogPost);
router.put('/:id', auth, upload.single('image'), updateBlogPost);
router.delete('/:id', auth, deleteBlogPost);

export default router;
