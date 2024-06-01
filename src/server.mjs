import express from "express";
import dotenv from "dotenv";
import Routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
// ADD PROPER SECRET
app.use(cookieParser("helloworld"));
app.use(Routes);

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/noted";

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
