const express = require('express');
const router = express.Router();
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/', getCategories);
router.post('/', auth, createCategory);
router.put('/:id', auth, updateCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;
