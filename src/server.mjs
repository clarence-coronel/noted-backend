import express from "express";
import dotenv from "dotenv";
import Routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/noted";

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use(express.json());
// ADD PROPER SECRET
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "clarence the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(Routes);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
