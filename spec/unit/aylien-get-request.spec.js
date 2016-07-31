var proxyquire = require("proxyquire").noPreserveCache();

describe("aylienGetRequest", function() {
  it("should throw if no URL passed", function() {
    expect(function() {
      require("../../aylien-get-request")();
    }).toThrow("Need an API request URL");
  });

  it("should throw if the URL passed does not match the api URL", function() {
    var aylienGetRequest = require("../../aylien-get-request");

    expect(function() {
      aylienGetRequest("https://api-key-steal.herokuapp.com/");
    }).toThrow("The host in the URL provided needs to match aylien's")
  });

  it("should make get request to aylien URL with API key", function() {
    var requestMock = jasmine.createSpyObj("request", ["get"]);

    var credentialsMock = {
      aylien: createSpy("aylien").andReturn({ applicationId: "applicationId", key: "key" })
    };

    var aylienGetRequest = proxyquire("../../aylien-get-request", {
      "request": requestMock,
      "./credentials": credentialsMock
    });

    aylienGetRequest("https://api.aylien.com/api/v1/summarize?url=http://urltosummarise.com");

    expect(requestMock.get)
      .toHaveBeenCalledWith({
        url: "https://api.aylien.com/api/v1/summarize?url=http://urltosummarise.com",
        headers: {
          "X-AYLIEN-TextAPI-Application-ID": "applicationId",
          "X-AYLIEN-TextAPI-Application-Key": "key"
        }
      });
  });
});
