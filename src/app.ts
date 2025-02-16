/*Import packages*/
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConfig from "./utils/dbConfig.js";
dotenv.config();

/*Import routes*/
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./router/studentRoutes.js";

/*Database connection*/
const port = process.env.PORT || 7000;
const dburl = process.env.MONGO_URL || "";
dbConfig(dburl);

/*App initialized*/
const app = express();

/*Middlewares*/
app.use(express.json());
app.use(cors());

/*This route handler sends a welcome message to the root URL ("/")*/
app.get("/", (req, res) => {
  res.send(`Welcome to the Student List App`);
});

/*Using routes*/
app.use("/api/student", userRoutes);

/*Custom middleware*/
app.use(notFound);
app.use(errorHandler);

/*Staring the server and listening on the specified port*/
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
