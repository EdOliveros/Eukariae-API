import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
    logo: {
        type: String, // URL to logo
    },
    heroImage: {
        type: String, // URL to hero image
    },
    siteName: {
        type: String,
        default: 'Eukariae',
    },
    contactEmail: {
        type: String,
    },
    socialLinks: {
        instagram: String,
        facebook: String,
        twitter: String,
    },
}, {
    timestamps: true,
});

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

export default SiteConfig;
