import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";


dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json()); // parse JSON body

/* Database */
connectDB();

/* Routes */
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

