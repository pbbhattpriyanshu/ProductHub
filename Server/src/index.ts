import { ENV } from "./config/env";
import express from "express";
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import path from "path";

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Basic Health Check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Welcome to ProductHub API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

// Import routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

// Apply routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // serve static files from Client/dist
  app.use(express.static(path.join(__dirname, "../Client/dist")));

  // handle SPA routing - send all non-API routes to index.html - react app
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
  });
}

app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));