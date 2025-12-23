import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* =========================
   CORS CONFIG
========================= */


// ✅ Production: allow ALL origins
app.use(
  cors({
    origin: "https://linkedin-one-xi.vercel.app", // EXACT Vercel URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


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
   FRONTEND (PRODUCTION)
========================= */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html")
    );
  });
}

/* =========================
   SERVER START
========================= */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
