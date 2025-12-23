import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* =========================
   ✅ CORS CONFIG (FIXED)
========================= */
app.use(
  cors({
    origin: [
      "https://linkedin-one-xi.vercel.app", // Vercel frontend
      "http://localhost:5173",              // Local dev
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

/* =========================
   ROUTES
========================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

/* =========================
   HEALTH CHECK (OPTIONAL)
========================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
});
