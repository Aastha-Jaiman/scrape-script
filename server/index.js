const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const scrapeRoutes = require("./routes/scrapeRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/scrape", scrapeRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, { dbName: "scraperDB" })
  .then(() => console.log(" MongoDB connected" , mongoose))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
