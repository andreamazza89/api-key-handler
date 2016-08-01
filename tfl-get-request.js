// Makes a get request to the passed tfl API URL.  Returns a
// readable stream object.

var requestLib = require("request");
var appendQuery = require("append-query");
var credentials = require("./credentials");

module.exports = function tflGetRequest(apiRequestUrl) {
  if (apiRequestUrl == null) {
    throw new Error("Need an API request URL");
  } else if (!apiRequestUrl.apiRequestUrl.match(/^https\:\/\/api\.tfl\.gov\.uk/)) {
    throw new Error("The host in the URL provided needs to match tfl's");
  }

  var authenticatedUrl = appendQuery(apiRequestUrl.apiRequestUrl, { "app_key": credentials.tfl().key, "app_id": credentials.tfl().id, "time": apiRequestUrl.time, "alternativeWalking": apiRequestUrl.alternativeWalking, "date": apiRequestUrl.date });
  return requestLib.get(authenticatedUrl);
};
