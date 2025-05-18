import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// ES module me __dirname define karna
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// static files for frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});