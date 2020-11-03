const express = require("express");

const db = require("../data/dbConfig.js");
const accountRouter = require("../data/helpers/accountRouter");

const server = express();

server.use(express.json());
server.use("/api", accountRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Let's write some middleware!</h2>
    <p>Here we are...</p>
    `);
});

module.exports = server;
