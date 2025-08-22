import dotenv from "dotenv";
dotenv.config(); // <-- Move this to the top

import express from "express";
import dbcon from "./app/config/dbcon.js";

dbcon();

const app = express();

app.use(express.json());


import router from "./app/router/auth.route.js";
app.use("/api/v1/auth", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running ", PORT);
});


