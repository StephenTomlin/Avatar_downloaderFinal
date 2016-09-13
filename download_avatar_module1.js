const env = require('dotenv').config(); //import dotenv package
const request = require('request');
module.exports = githubRequest;

function githubRequest(endpoint, callback) {
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
      bearer: process.env.DB_TOKEN // read credential file
    },
    headers: {
      'User-Agent': "request" // Github requires a user agent header. You can put anything here.
    }
  }
  request.get(requestData, callback);// The actual request. When the data is ready, `callback` is called.
}