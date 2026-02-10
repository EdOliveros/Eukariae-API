import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadFeature from '@adminjs/upload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Load Models
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import BlogPost from '../models/BlogPost.js';
import SiteConfig from '../models/SiteConfig.js';

const adminJsOptions = {
    resources: [
        {
            resource: Category,
            options: {
                parent: { name: 'Store', icon: 'Store' },
                properties: {
                    image: {
                        description: 'Sube una imagen o pega un link/URL',
                    },
                    imageKey: { isVisible: false },
                    imageBucket: { isVisible: false },
                    imageMime: { isVisible: false },
                    imageSize: { isVisible: false },
                }
            },
            features: [
                uploadFeature({
                    provider: { local: { bucket: path.join(__dirname, '../uploads') } },
                    properties: {
                        key: 'image',
                        mimeType: 'imageMime',
                        size: 'imageSize',
                        bucket: 'imageBucket',
                    },
                    validation: { mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'] },
                }),
            ],
        },
        {
            resource: Product,
            options: {
                parent: { name: 'Store', icon: 'Store' },
                properties: {
                    image: {
                        description: 'Sube una imagen o pega un link/URL',
                    },
                    category: { isRequired: true },
                    imageKey: { isVisible: false },
                    imageBucket: { isVisible: false },
                    imageMime: { isVisible: false },
                    imageSize: { isVisible: false },
                }
            },
            features: [
                uploadFeature({
                    provider: { local: { bucket: path.join(__dirname, '../uploads') } },
                    properties: {
                        key: 'image',
                        mimeType: 'imageMime',
                        size: 'imageSize',
                        bucket: 'imageBucket',
                    },
                    validation: { mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'] },
                }),
            ],
        },
        { resource: BlogPost, options: { parent: { name: 'Content', icon: 'Document' } } },
        { resource: SiteConfig, options: { parent: { name: 'Settings', icon: 'Settings' } } },
    ],
    branding: {
        companyName: 'Eukariae Admin',
        softwareBrothers: false, // hide AdminJS footer
    },
    rootPath: '/admin',
};

const adminJs = new AdminJS(adminJsOptions);

// Authentication for AdminJS
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return { email: email };
        }
        return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
}, null, {
    resave: false,
    saveUninitialized: true,
    secret: 'shhh-secret', // Added secret for session
});

export { adminJs, adminRouter };
