require('dotenv').config();
const tokens = require('../tokens');

module.exports = tokens.map(token => ({
    tk: token,
    config: require("./config.js"),
}));
