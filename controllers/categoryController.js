import Category from '../models/Category.js';

// @desc    Fetch all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        const normalizedCategories = categories.map(cat => ({
            ...cat._doc,
            image: cat.image && !cat.image.startsWith('http') && !cat.image.startsWith('/')
                ? `/uploads/${cat.image}`
                : cat.image
        }));
        res.json(normalizedCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { name, description, image: imageUrl } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : (imageUrl || '');
        const category = new Category({ name, description, image });
        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
    try {
        const { name, description, image: imageUrl } = req.body;
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = name || category.name;
            category.description = description || category.description;
            if (req.file) {
                category.image = `/uploads/${req.file.filename}`;
            } else if (imageUrl !== undefined) {
                category.image = imageUrl;
            }
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.deleteOne();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
