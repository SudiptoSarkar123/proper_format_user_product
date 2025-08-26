import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import dbcon from "./app/config/dbcon.js";
import indexRouter from "./app/router/index.route.js";

dotenv.config();

const app = express();
app.use(cors());


dbcon();

app.use(compression({threshold:1024}));
app.use(express.json());

app.use("/api/v1", indexRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});