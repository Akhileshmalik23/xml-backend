const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const uploadRoutes = require("./routers/uploadRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const corsOption = {
    origin: [
        "http://localhost:5173",
        "https://xml-frontend-gxe3ffwgu-akhileshs-projects-21204547.vercel.app/"
    ],
    credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
