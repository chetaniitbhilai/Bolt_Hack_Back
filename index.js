import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import bhandaraRoutes from "./routes/bhandaraRoute.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

dotenv.config();

console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);
console.log("PORT:", process.env.PORT);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", bhandaraRoutes);

// ✅ Wrap server start inside async function
const startServer = async () => {
    try {
        await connectToMongoDB(); // ⬅️ Wait until DB is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();
