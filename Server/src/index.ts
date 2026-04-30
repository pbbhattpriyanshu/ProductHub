import { ENV } from "./config/env";
import express from "express";
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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

app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));