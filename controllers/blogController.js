const BlogPost = require('../models/BlogPost');

// @desc    Fetch all blog posts
// @route   GET /api/v1/blog
// @access  Public
const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find({}).sort({ createdAt: -1 });
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single blog post
// @route   GET /api/v1/blog/:id
// @access  Public
const getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (blogPost) {
            res.json(blogPost);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog post
// @route   POST /api/v1/blog
// @access  Private/Admin
const createBlogPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const blogPost = new BlogPost({
            title,
            content,
            image,
            author,
        });

        const createdBlogPost = await blogPost.save();
        res.status(201).json(createdBlogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog post
// @route   PUT /api/v1/blog/:id
// @access  Private/Admin
const updateBlogPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blogPost = await BlogPost.findById(req.params.id);

        if (blogPost) {
            blogPost.title = title || blogPost.title;
            blogPost.content = content || blogPost.content;
            blogPost.author = author || blogPost.author;

            if (req.file) {
                blogPost.image = `/uploads/${req.file.filename}`;
            }

            const updatedBlogPost = await blogPost.save();
            res.json(updatedBlogPost);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/v1/blog/:id
// @access  Private/Admin
const deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (blogPost) {
            await blogPost.deleteOne();
            res.json({ message: 'Blog post removed' });
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
};
