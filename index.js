import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from "cors"

import authRoute from './routes/auth.js'
import productRoute from './routes/product.js'
import userRoute from './routes/user.js'

dotenv.config();
const PORT = process.env.PORT || 9000;

const app = express();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.URL_DATABASE_MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    return res.status(status).json({
        error: {
            message: error.message,
        },
    });
});

app.listen(PORT, async () => {
    await connectDatabase()
    console.log(`Server is running on http://localhost:${PORT}`);
});