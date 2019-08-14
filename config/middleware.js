const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// @TO-DO: wire it up when db set up will be ready
// const db = require('../data/dbConfig');

require('dotenv').config();

module.exports = (server) => {
    server.use(morgan('dev'));
    server.use(cors());
    server.use(helmet());
    server.use(express.json());
}