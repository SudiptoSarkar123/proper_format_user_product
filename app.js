import dotenv from "dotenv";
dotenv.config(); // <-- Move this to the top

import express from "express";
import dbcon from "./app/config/dbcon.js";

dbcon();

const app = express();

app.use(express.json());


import authRouter from "./app/router/auth.route.js";
import productRouter from "./app/router/product.route.js";

app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running ", PORT);
});


