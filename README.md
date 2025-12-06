# Product Showcase & Enquiry – Full Stack Application

A complete full‑stack project built using **Node.js (Express)**, **MySQL**, **React (Vite)**, and **TailwindCSS**. Users can browse products, view details, and submit enquiries. Admins can log in and view all enquiries.

---

## 🚀 Features

### **Frontend (React + Vite + TailwindCSS)**

- Responsive UI with Tailwind
- Home page with product listing
- Search, category filter, pagination
- Product details page
- Enquiry form modal
- Admin login page
- Protected admin enquiries page
- Global auth using context
- Axios API integration

### **Backend (Node.js + Express)**

- MySQL database
- JWT authentication
- Admin login
- Products APIs (pagination, search, filter)
- Enquiry creation
- Protected enquiries list
- Morgan logging
- CORS enabled
- Environment variables support

---

## 📁 Project Structure

```
product-showcase/
  backend/
  frontend/
  README.md
  .gitignore
  .env.example
```

---

# 🛠 Backend Setup

## 1️⃣ Install Dependencies

```
cd backend
npm install
```

## 2️⃣ Configure Environment Variables

Create **.env** based on `.env.example`:

```
PORT=5000
JWT_SECRET=supersecretkey
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=product_showcase
```

## 3️⃣ Create MySQL Database

```
CREATE DATABASE product_showcase;
```

## 4️⃣ Run Seed Script

```
node seed.js
```

This creates tables and inserts **15 sample products + admin user**.

### 🔐 Admin Credentials

```
Email: admin@example.com
Password: admin123
```

## 5️⃣ Start Backend Server

```
npm run dev
```

Server runs on **[http://localhost:5000](http://localhost:5000)**

---

# 📡 Backend API Documentation

## ✔ Base URL

```
http://localhost:5000/api
```

---

## 🟢 1. Health Check

**GET** `/api`

```
Response: { message: "API running" }
```

---

## 🟦 2. Get Products (search + pagination)

**GET** `/api/products`

### Query Params

| Name     | Type   | Example     |
| -------- | ------ | ----------- |
| page     | number | 1           |
| limit    | number | 8           |
| search   | string | headphones  |
| category | string | Electronics |

### Example URL

```
/api/products?page=1&limit=8&search=watch&category=Electronics
```

---

## 🟦 3. Get Product by ID

**GET** `/api/products/:id`

Example:

```
/api/products/1
```

---

## 🟩 4. Post Enquiry

**POST** `/api/enquiries`

### Body

```json
{
  "product_id": 1,
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone": "9876543210",
  "message": "Is this product available?"
}
```

---

## 🟧 5. Admin Login

**POST** `/api/auth/login`

### Body

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Response

Returns JWT token.

---

## 🔐 6. Get All Enquiries (Protected)

**GET** `/api/enquiries`

### Headers

```
Authorization: Bearer <jwt token>
```

---

# 🖥 Frontend Setup (React + Vite + Tailwind)

## 1️⃣ Install Dependencies

```
cd frontend
npm install
```

## 2️⃣ Start Development Server

```
npm run dev
```

Runs on **[http://localhost:5173](http://localhost:5173)**

---

# ⚛️ Frontend Pages

### 🏠 Home / Product List

- Shows all products
- Search box
- Category filter
- Pagination
- Click product to open details page

### 📄 Product Details

- Product info
- "Enquire Now" opens modal form

### 📝 Enquiry Modal

- Validates fields
- Posts enquiry

### 🔐 Admin Login

- Login using admin credentials

### 🛡 Protected Admin Enquiries

- Requires JWT token
- Shows list of enquiries

---

# 🔒 Auth System

- Login stores JWT token
- Token saved in localStorage
- Logout clears token
- ProtectedRoute checks token

---

# 🧪 Postman Collection

Use `product-showcase.postman_collection.json` included in the repository.

Endpoints:

- Health check
- Get products
- Get product by ID
- Login
- Post enquiry
- Get all enquiries (protected)

---

# 📄 env.example

```
PORT=5000
JWT_SECRET=supersecretkey
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=product_showcase
```

---

# 👤 Admin Credentials

```
Email: admin@example.com
Password: admin123
```

---
