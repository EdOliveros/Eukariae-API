import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';

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
                        description: 'Link o URL de la imagen de la categoría',
                    }
                }
            }
        },
        {
            resource: Product,
            options: {
                parent: { name: 'Store', icon: 'Store' },
                properties: {
                    image: {
                        description: 'Link o URL de la imagen del producto',
                    },
                    category: {
                        isRequired: true,
                    }
                }
            }
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
