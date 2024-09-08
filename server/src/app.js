import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import ApiRouter from "./routes/index.js";
import { healthCheck } from "./controllers/health.controller.js";

// accept json and form data
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cross origin requests
app.use(
  cors({
    origin: "https://emp10.vercel.app",
    credentials: true,
  })
);

// app.use(cors());

// for receiving cookies
app.use(cookieParser());

app.use("/api", ApiRouter);

app.use("/health", healthCheck);

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    error: {
      message: err.message,
    },
  });
});

export { app };
