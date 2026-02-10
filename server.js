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

// Middleware
app.use(express.json());
app.use(cors());

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
    app.use(adminJs.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer();
