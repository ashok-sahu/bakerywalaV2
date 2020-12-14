const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require('helmet')
const MemoryStore = require("memorystore")(session);
const app = express();

//all middlewares
app.enable("trust proxy");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(cookieParser());
app.use(
  session({
    secret: "give-five",
    resave: true,
    saveUninitialized: true,
    name: "cookieUUID",
    cookie: {
      maxAge: 86400000,
      httpOnly: false,
      secure: false,
      sameSite: false,
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);


module.exports = app;
