const express = require("express");
const server = express();

const middleWareConfig = require("./config/middleware.js");

middleWareConfig(server);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up and running!" });
});

module.exports = server;