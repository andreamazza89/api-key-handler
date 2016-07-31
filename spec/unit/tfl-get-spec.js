var proxyquire = require("proxyquire").noPreserveCache();

describe("tflGetRequest", function() {
  it("should throw if no URL passed", function() {
    expect(function() {
      require("../../tfl-get-request")();
    }).toThrow("Need an API request URL");
  });

  it("should throw if the URL passed does not match the api URL", function() {
    var tflGetRequest = require("../../tfl-get-request");

    expect(function() {
      tflGetRequest("https://api-key-steal.herokuapp.com//StopPoint/Search/wharf?modes=tube");
    }).toThrow("The host in the URL provided needs to match tfl's")
  });

  it("should make get request to tfl URL with API key and ID", function() {
    var requestMock = jasmine.createSpyObj("request", ["get"]);

    var credentialsMock = {
      tfl: createSpy("tfl").andReturn({ key: "key", id: "id" })
    };

    var tflGetRequest = proxyquire("../../tfl-get-request", {
      "request": requestMock,
      "./credentials": credentialsMock
    });

    tflGetRequest("https://api.tfl.gov.uk/StopPoint/Search/wharf?modes=tube");

    expect(requestMock.get)
      .toHaveBeenCalledWith("https://api.tfl.gov.uk/StopPoint/Search/wharf?modes=tube&app_key=key&app_id=id");
  });
});
