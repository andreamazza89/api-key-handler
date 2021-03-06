var guardianGetRequest = require("./guardian-get-request");
var aylienGetRequest = require("./aylien-get-request");
var tflGetRequest = require("./tfl-get-request");

function index(request, response) {
  response.send("For help with this API, see the News Summary GitHub repo");
};

function guardian(request, response) {
  try {
    guardianGetRequest(request.query.apiRequestUrl).pipe(response);
  } catch (e) {
    reportError(response, e.message);
  }
};

function aylien(request, response) {
  try {
    aylienGetRequest(request.query.apiRequestUrl).pipe(response);
  } catch (e) {
    reportError(response, e.message);
  }
};

function tfl(request, response) {
  try {
    tflGetRequest(request.query).pipe(response);
  } catch (e) {
    reportError(response, e.message);
  }
};

function reportError(response, message) {
  response.json({ error: message });
};

module.exports = {
  index: index,
  guardian: guardian,
  aylien: aylien,
  tfl: tfl
};
