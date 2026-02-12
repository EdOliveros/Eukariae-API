import './admin/init.js';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Trust proxy for Render/Heroku etc
app.set('trust proxy', 1);

// Middleware - Apply body-parsers only to API routes to avoid conflict with AdminJS multipart parsing
app.use('/api', express.json({ limit: '50mb' }));
app.use('/api', express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: true,
    credentials: true,
}));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// AdminJS
import { buildAdminRouter } from './admin/admin.config.js';

// Routes
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import configRoutes from './routes/configRoutes.js';

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/config', configRoutes);

// Static folder for uploads
app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => {
    // Basic health check endpoint
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    const { adminJs, adminRouter } = await buildAdminRouter();

    // FALLBACK: Serve AdminJS bundled components manually if the middleware fails
    // This addresses the persistent 404 / MIME type error on Render
    // We put this BEFORE the adminRouter to bypass authentication for the bundle
    app.get('/admin/frontend/assets/components.bundle.js', (req, res) => {
        const bundlePath = path.join(process.env.ADMIN_JS_TMP_DIR, 'bundle.js');
        console.log('Serving AdminJS bundle from:', bundlePath);
        if (fs.existsSync(bundlePath)) {
            res.type('application/javascript');
            res.sendFile(bundlePath);
        } else {
            console.error('AdminJS bundle not found at:', bundlePath);
            res.status(404).send('Bundle not found');
        }
    });

    // AdminJS router
    app.use(adminJs.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer();
