import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import pgSession from "connect-pg-simple";

import "./config/passport.js";
import pool from "./config/db.js";
import accountRouter from "./routes/accountRoutes.js";

dotenv.config();

const app = express();
const port = 3000;

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pgSessionStore = pgSession(session);

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://trial-auth-drab.vercel.app",
    "http://192.168.0.51:5173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    store: new pgSessionStore({
      pool: pool,
      tablename: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? "" : "none",
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

const checkAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Please log in" });
  }
};

app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "User is authenticated", user: req.user });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
});

app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
