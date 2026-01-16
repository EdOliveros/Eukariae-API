# Eukariae API

[Español](#español) | [English](#english)

---

## Español

API Backend para la tienda y blog de Eukariae. Construida con Node.js, Express, MongoDB y AdminJS.

### 🔗 Enlace de la API
La API está desplegada en vivo en:
**[https://eukariae-api.onrender.com/api/v1](https://eukariae-api.onrender.com/api/v1)**

### 🚀 Endpoints Principales

| Recurso | Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Productos** | GET | `/api/v1/products` | Listar todos los productos | No |
| | GET | `/api/v1/products/:id` | Obtener un producto por ID | No |
| | POST | `/api/v1/products` | Crear un nuevo producto | Sí |
| **Categorías** | GET | `/api/v1/categories` | Listar todas las categorías | No |
| | POST | `/api/v1/categories` | Crear una nueva categoría | Sí |
| **Blog** | GET | `/api/v1/blog` | Listar todas las entradas del blog | No |
| | GET | `/api/v1/blog/:id` | Obtener una entrada por ID | No |
| | POST | `/api/v1/blog` | Crear una nueva entrada | Sí |
| **Config** | GET | `/api/v1/config` | Obtener configuración del sitio | No |
| | PUT | `/api/v1/config` | Actualizar configuración (Logo/Hero) | Sí |

> [!NOTE]
> El panel de administración está disponible en `/admin`. Las rutas que requieren autenticación necesitan un token JWT válido.

### Características

- **Gestión de Tienda**: CRUD para Productos y Categorías.
- **Gestión de Blog**: CRUD para entradas de Blog.
- **Panel de Administración**: Interfaz intuitiva vía AdminJS en `/admin`.
- **Autenticación**: Basada en JWT para endpoints de la API.
- **Manejo de Imágenes**: Multer para carga de archivos.
- **Configurable**: Basado en variables de entorno `.env`.

### Inicio Rápido

#### Requisitos Previos
- Node.js (v18.19.1+)
- MongoDB (Atlas o Local)

#### Instalación
1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: `cp .env.example .env` (Modificar con tus credenciales).

#### Ejecución
- **Desarrollo**: `npm run dev`
- **Producción**: `npm start`

---

## English

Backend API for the Eukariae store and blog. Built with Node.js, Express, MongoDB, and AdminJS.

### 🔗 API Link
The API is live at:
**[https://eukariae-api.onrender.com/api/v1](https://eukariae-api.onrender.com/api/v1)**

### 🚀 Main Endpoints

| Resource | Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Products** | GET | `/api/v1/products` | List all products | No |
| | GET | `/api/v1/products/:id` | Get product by ID | No |
| | POST | `/api/v1/products` | Create a new product | Yes |
| **Categories** | GET | `/api/v1/categories` | List all categories | No |
| | POST | `/api/v1/categories` | Create a new category | Yes |
| **Blog** | GET | `/api/v1/blog` | List all blog posts | No |
| | GET | `/api/v1/blog/:id` | Get blog post by ID | No |
| | POST | `/api/v1/blog` | Create a new blog post | Yes |
| **Config** | GET | `/api/v1/config` | Get site configuration | No |
| | PUT | `/api/v1/config` | Update configuration (Logo/Hero) | Yes |

### Features

- **Store Management**: CRUD for Products and Categories.
- **Blog Management**: CRUD for Blog Posts.
- **Admin Panel**: Intuitive UI via AdminJS at `/admin`.
- **Authentication**: JWT-based auth for API endpoints.
- **Image Handling**: Multer for file uploads.
- **Environment Driven**: Configurable via `.env`.

### Technical Stack
- **Framework**: Express.js
- **Database**: MongoDB / Mongoose
- **Admin UI**: AdminJS
- **Auth**: JSON Web Tokens (JWT) & bcryptjs
- **Uploads**: Multer

