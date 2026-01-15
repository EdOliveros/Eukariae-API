const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const mongoose = require('mongoose');

// Register adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Load Models
const Product = require('../models/Product');
const Category = require('../models/Category');
const BlogPost = require('../models/BlogPost');
const SiteConfig = require('../models/SiteConfig');

const adminJsOptions = {
    resources: [
        { resource: Category, options: { parent: { name: 'Store', icon: 'Store' } } },
        { resource: Product, options: { parent: { name: 'Store', icon: 'Store' } } },
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
});

module.exports = { adminJs, adminRouter };
