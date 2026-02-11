import AdminJS from 'adminjs';
import { adminJsOptions } from './admin.config.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const bundle = async () => {
    console.log('Starting AdminJS bundling...');
    console.log('AdminJS version:', AdminJS.VERSION);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('AdminJS tmp dir:', process.env.ADMIN_JS_TMP_DIR);

    const adminJs = new AdminJS(adminJsOptions);

    console.log('Initializing AdminJS...');
    await adminJs.initialize();

    console.log('AdminJS bundling completed successfully.');
    process.exit(0);
};

bundle().catch((error) => {
    console.error('AdminJS bundling failed:', error);
    process.exit(1);
});
