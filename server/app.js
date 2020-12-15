const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const MemoryStore = require("memorystore")(session);
const app = express();

//all routes
const routes = require('./routes/routes')

//all middlewares
app.enable("trust proxy");
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true,limit: '10kb' }));

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use(process.env.API_URL, limiter)

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
app.use(compression())

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

//all routes
app.use(routes)

module.exports = app;
