const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = require("../app");

function assetsSetup() {
  if (process.env.NODE_ENV === "production") {
    app.use(cors());
    app.options("*", cors());
    app.use(express.static(path.resolve(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
    });
  } else {
    app.use(
      cors({
        origin: process.env.CLIENT_URI,
      })
    );
    app.use(morgan("dev"));
    app.use(express.static(path.resolve(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
    });
  }
}

module.exports = assetsSetup;
