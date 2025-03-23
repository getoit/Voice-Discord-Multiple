require('dotenv').config();

const tokens = process.env.TOKENS.split(',');

module.exports = tokens.map(token => ({
    tk: token,
    config: require("./config.js"),
}));
