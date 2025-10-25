const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
// const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/notifications", notificationRoutes);

// Health Check
app.get("/", (req, res) => res.send("API running"));

// 404 Handler
app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
