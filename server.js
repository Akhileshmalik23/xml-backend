const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const uploadRoutes = require("./routers/uploadRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
