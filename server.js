const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// AdminJS
const { adminJs, adminRouter } = require('./admin/admin.config');
app.use(adminJs.options.rootPath, adminRouter);

// Routes
app.use('/api/v1/products', require('./routes/productRoutes'));
app.use('/api/v1/categories', require('./routes/categoryRoutes'));
app.use('/api/v1/blog', require('./routes/blogRoutes'));
app.use('/api/v1/config', require('./routes/configRoutes'));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
