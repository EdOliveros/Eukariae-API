const express = require('express');
const router = express.Router();
const {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
} = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', auth, upload.single('image'), createBlogPost);
router.put('/:id', auth, upload.single('image'), updateBlogPost);
router.delete('/:id', auth, deleteBlogPost);

module.exports = router;
