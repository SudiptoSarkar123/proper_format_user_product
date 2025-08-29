import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cors from "cors";
import compression from "compression";
import dbcon from "./app/config/dbcon.js";
import indexRouter from "./app/router/index.route.js";
// import path from "path";
// import expressAsyncHandler from "express-async-handler";

dotenv.config();

const app = express();
app.use(cors());
dbcon();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(compression({ threshold: 1024 }));

app.use("/api/v1", indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
