const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.;

module.exports = knex(config[environment]);