// Makes a get request to the passed tfl API URL.  Returns a
// readable stream object.

var requestLib = require("request");
var appendQuery = require("append-query");
var credentials = require("./credentials");

module.exports = function tflGetRequest(apiRequestUrl) {
  if (apiRequestUrl == null) {
    throw new Error("Need an API request URL");
  }

  var authenticatedUrl = appendQuery(apiRequestUrl, { "app_key": credentials.tfl().key, "app_id": credentials.tfl().id });
  return requestLib.get(authenticatedUrl);
};
