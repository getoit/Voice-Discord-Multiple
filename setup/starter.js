const fs = require('fs');
const path = require('path');

const tokensPath = path.join(__dirname, '../tokens.txt'); // Updated path to point to the correct location
const tokens = fs.readFileSync(tokensPath, 'utf-8').trim().split('\n');

module.exports = tokens.map(token => ({
    tk: token,
    config: require("./config.js"),
}));
