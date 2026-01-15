const express = require('express');
const router = express.Router();
const {
    getConfig,
    updateConfig,
} = require('../controllers/configController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getConfig);
router.put('/', auth, upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 }
]), updateConfig);

module.exports = router;
