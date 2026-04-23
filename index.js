import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();

const app = express();

/* Middleware */
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim()).filter(Boolean)
  : [];

console.log("CORS allowed origins:", allowedOrigins.length ? allowedOrigins : "ALL (no FRONTEND_URL set)");


console.log("frontend url", process.env.FRONTEND_URL);
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json()); // parse JSON body

/* Database */
connectDB();

/* Routes */
app.use("/api/upload", uploadRoutes);
app.use("/api", routes);

/* Health check */
app.get("/", (req, res) => {
  res.send("Server running...");
});

/* Global error handler (optional) */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
