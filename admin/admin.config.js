import './init.js';
import { AdminJS, ComponentLoader } from 'adminjs';
import * as AdminJSExpressImport from '@adminjs/express';
import * as AdminJSMongooseImport from '@adminjs/mongoose';

// Handle both default and named imports for AdminJSExpress and AdminJSMongoose
const AdminJSExpress = AdminJSExpressImport.default || AdminJSExpressImport;
const AdminJSMongoose = AdminJSMongooseImport.default || AdminJSMongooseImport;
import path from 'path';
import { fileURLToPath } from 'url';
import uploadFeature from '@adminjs/upload';
import express from 'express';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register adapter
AdminJS.registerAdapter(AdminJSMongoose);

const componentLoader = new ComponentLoader();

// Load Models
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import BlogPost from '../models/BlogPost.js';
import SiteConfig from '../models/SiteConfig.js';

export const adminJsOptions = {
    resources: [
        {
            resource: Category,
            options: {
                parent: { name: 'Store', icon: 'Store' },
                properties: {
                    image: {
                        description: 'Sube una imagen o pega un link/URL',
                    },
                    imageFile: {
                        description: 'Sube una imagen (archivo)',
                        isVisible: { list: false, filter: false, show: false, edit: true },
                    },
                    imageKey: { isVisible: false },
                    imageBucket: { isVisible: false },
                    imageMime: { isVisible: false },
                    imageSize: { isVisible: false },
                },
                actions: {
                    new: {
                        before: async (request) => {
                            console.log('AdminJS: Creating new Category...');
                            if (request.payload) console.log('Payload keys:', Object.keys(request.payload));
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            console.log(`AdminJS: Editing Category ${request.params.recordId}...`);
                            if (request.payload) console.log('Payload keys:', Object.keys(request.payload));
                            return request;
                        },
                    },
                },
            },
            features: [
                uploadFeature({
                    componentLoader,
                    provider: { local: { bucket: path.join(process.cwd(), 'uploads') } },
                    properties: {
                        file: 'imageFile',
                        key: 'image',
                        mimeType: 'imageMime',
                        size: 'imageSize',
                        bucket: 'imageBucket',
                    },
                    uploadPath: (record, filename) => filename,
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
                    imageFile: {
                        description: 'Sube una imagen (archivo)',
                        isVisible: { list: false, filter: false, show: false, edit: true },
                    },
                    category: { isRequired: true },
                    specifications: {
                        props: {
                            name: { label: 'Nombre' },
                            value: { label: 'Valor' },
                        },
                    },
                    imageKey: { isVisible: false },
                    imageBucket: { isVisible: false },
                    imageMime: { isVisible: false },
                    imageSize: { isVisible: false },
                },
                actions: {
                    new: {
                        before: async (request) => {
                            console.log('AdminJS: Creating new Product...');
                            if (request.payload) console.log('Payload keys:', Object.keys(request.payload));
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            console.log(`AdminJS: Editing Product ${request.params.recordId}...`);
                            if (request.payload) console.log('Payload keys:', Object.keys(request.payload));
                            return request;
                        },
                    },
                },
            },
            features: [
                uploadFeature({
                    componentLoader,
                    provider: { local: { bucket: path.join(process.cwd(), 'uploads') } },
                    properties: {
                        file: 'imageFile',
                        key: 'image',
                        mimeType: 'imageMime',
                        size: 'imageSize',
                        bucket: 'imageBucket',
                    },
                    uploadPath: (record, filename) => filename,
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
    componentLoader,
};

const buildAuthRouter = (adminJs) => {
    // Explicitly create an express router to pass to AdminJSExpress
    const router = express.Router();

    return AdminJSExpress.buildAuthenticatedRouter(adminJs, {
        authenticate: async (email, password) => {
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                return { email: email };
            }
            return null;
        },
        cookieName: 'adminjs',
        cookiePassword: process.env.COOKIE_PASSWORD || 'super-secret-password-at-least-32-chars-long',
    }, router, {
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || 'another-secret-at-least-32-chars', // Added secret for session
        proxy: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
    }, {
        // EXDEV fix: set uploadDir to a folder on the same partition/filesystem
        uploadDir: path.join(process.cwd(), 'uploads/tmp'),
    });
};

const createAdmin = () => new AdminJS(adminJsOptions);

export const buildAdminRouter = async () => {
    const adminJs = createAdmin();

    // Always initialize to ensure assets are ready if they weren't pre-bundled
    await adminJs.initialize();

    const adminRouter = buildAuthRouter(adminJs);
    return { adminJs, adminRouter };
};
export { componentLoader };
