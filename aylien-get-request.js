// Makes a get request to the passed Aylien API URL.  Returns a
// readable stream object.

var requestLib = require("request");
var credentials = require("./credentials");

module.exports = function aylienGetRequest(apiRequestUrl) {
  if (apiRequestUrl == null) {
    throw new Error("Need an API request URL");
  } else if (!apiRequestUrl.match(/^https\:\/\/api\.aylien\.com/)) {
    throw new Error("The host in the URL provided needs to match aylien's");
  }

  var headers = {
    "X-AYLIEN-TextAPI-Application-ID": credentials.aylien().applicationId,
    "X-AYLIEN-TextAPI-Application-Key": credentials.aylien().key
  };

  return requestLib
    .get({ url: apiRequestUrl, headers: headers });
};
