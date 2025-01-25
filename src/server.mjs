import express from "express";
import dotenv from "dotenv";
import Routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors"; // Importing the cors package

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/noted";

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use(express.json());

// Enable CORS for all origins
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: "@SeCR3T",
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

app.use(passport.session());
app.use(Routes);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
