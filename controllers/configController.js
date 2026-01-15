import SiteConfig from '../models/SiteConfig.js';

// @desc    Get site config
// @route   GET /api/v1/config
// @access  Public
export const getConfig = async (req, res) => {
    try {
        const config = await SiteConfig.findOne({});
        if (config) {
            res.json(config);
        } else {
            res.status(404).json({ message: 'Config not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update site config
// @route   PUT /api/v1/config
// @access  Private/Admin
export const updateConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne({});
        const { siteName, contactEmail, socialLinks } = req.body;

        if (!config) {
            config = new SiteConfig({});
        }

        config.siteName = siteName || config.siteName;
        config.contactEmail = contactEmail || config.contactEmail;

        if (socialLinks) {
            config.socialLinks = {
                instagram: socialLinks.instagram || config.socialLinks.instagram,
                facebook: socialLinks.facebook || config.socialLinks.facebook,
                twitter: socialLinks.twitter || config.socialLinks.twitter,
            };
        }

        if (req.files) {
            if (req.files.logo) {
                config.logo = req.files.logo[0].filename;
            }
            if (req.files.heroImage) {
                config.heroImage = req.files.heroImage[0].filename;
            }
        }

        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
