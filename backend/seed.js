const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function seed() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "product_showcase",
    });

    console.log("🚀 Connected to MySQL");

    // Drop tables (order matters due to FK)
    await connection.execute("DROP TABLE IF EXISTS enquiries");
    await connection.execute("DROP TABLE IF EXISTS admin");
    await connection.execute("DROP TABLE IF EXISTS products");

    console.log("🗑 Old tables dropped");

    // Create admin table
    await connection.execute(`
      CREATE TABLE admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create products table
    await connection.execute(`
      CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        category VARCHAR(255),
        short_desc TEXT,
        long_desc TEXT,
        price DECIMAL(10,2),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create enquiries table
    await connection.execute(`
      CREATE TABLE enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
      );
    `);

    console.log("📦 Tables created");

    // Insert products

    const products = [
      [
        "Wireless Headphones",
        "Electronics",
        "High-quality wireless audio",
        "Long battery life + noise cancellation.",
        1999.0,
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600",
      ],
      [
        "Smart Watch",
        "Electronics",
        "Track your fitness",
        "HR monitor, GPS, waterproof",
        2999.0,
        "https://images.unsplash.com/photo-1518443285568-2f602ec0743f?w=600",
      ],
      [
        "Fiction Book",
        "Books",
        "Fantasy novel",
        "Amazing world-building",
        499.0,
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600",
      ],
      [
        "Bluetooth Speaker",
        "Electronics",
        "Portable speaker",
        "Strong bass, compact design",
        999.0,
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600",
      ],
      [
        "Gaming Mouse",
        "Accessories",
        "Precision sensor",
        "RGB lighting, ergonomic design",
        1499.0,
        "https://images.unsplash.com/photo-1580894908361-967195033a57?w=600",
      ],
      [
        "Office Chair",
        "Furniture",
        "Ergonomic office chair",
        "Lumbar support + adjustable height",
        4999.0,
        "https://images.unsplash.com/photo-1582582424505-60e0cabf07ba?w=600",
      ],
      [
        "Running Shoes",
        "Fitness",
        "Lightweight running shoes",
        "Comfortable for long runs",
        2499.0,
        "https://images.unsplash.com/photo-1528701800489-20be9c6e1e21?w=600",
      ],
      [
        "Yoga Mat",
        "Fitness",
        "Premium yoga mat",
        "Non-slip surface, lightweight",
        899.0,
        "https://images.unsplash.com/photo-1599058917212-d750089bc07d?w=600",
      ],
      [
        "Desk Lamp",
        "Home",
        "LED desk lamp",
        "Adjustable brightness + USB charging",
        799.0,
        "https://images.unsplash.com/photo-1582719366768-c04378747e5a?w=600",
      ],
      [
        "Coffee Maker",
        "Home",
        "Automatic coffee maker",
        "Brews rich coffee in minutes",
        3499.0,
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600",
      ],
      [
        "Men’s Jacket",
        "Fashion",
        "Winter wear jacket",
        "Warm, water resistant",
        1999.0,
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
      ],
      [
        "Women’s Handbag",
        "Fashion",
        "Elegant leather handbag",
        "Premium build quality",
        2299.0,
        "https://images.unsplash.com/photo-1570872620842-847b85a7ab13?w=600",
      ],
      [
        "Water Bottle",
        "Accessories",
        "Stainless steel bottle",
        "Keeps water cool for 12 hours",
        399.0,
        "https://images.unsplash.com/photo-1602141841150-1d6f1d5af02f?w=600",
      ],
      [
        "Mechanical Keyboard",
        "Electronics",
        "RGB mechanical keyboard",
        "Tactile switches, wired",
        2799.0,
        "https://images.unsplash.com/photo-1587825140708-0fcbf2f6f76e?w=600",
      ],
      [
        "Laptop Stand",
        "Accessories",
        "Aluminum laptop stand",
        "Improves posture + cooling",
        1299.0,
        "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=600",
      ],
    ];

    for (let p of products) {
      await connection.execute(
        `INSERT INTO products (name, category, short_desc, long_desc, price, image_url)
         VALUES (?, ?, ?, ?, ?, ?)`,
        p
      );
    }

    console.log("🛒 Products inserted");

    // Insert Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await connection.execute(
      `INSERT INTO admin (email, password) VALUES (?, ?)`,
      ["admin@example.com", hashedPassword]
    );

    console.log(
      "🔐 Admin inserted (email: admin@example.com / password: admin123)"
    );

    await connection.end();
    console.log("🎉 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Error in seed:", err);
  }
}

seed();
