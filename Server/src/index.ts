import express from "express";
import { ENV } from "./config/env";

const app = express();

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