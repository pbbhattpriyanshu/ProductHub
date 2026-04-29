import express from 'express';
import { ENV } from './config/env.js'

const app = express();

// Dummy Route
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

app.listen(ENV.PORT, () => {console.log("Server is listening on PORT", ENV.PORT)})