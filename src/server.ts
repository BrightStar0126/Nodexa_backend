import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./database";
import apiRoute from "./routes";

// Configure NodeJS App Environment Variables
dotenv.config({ path: ".env" });

// Create Api Express Server Instance
const app: Application = express();

// Api Server Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length");
  next();
});

app.use(cookieParser());

// Server Routes
app.use("/api", apiRoute);

// Listen To Api Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);

  // Connect To  DB
  db;
});

export default app;
