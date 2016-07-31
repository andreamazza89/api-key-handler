var proxyquire = require("proxyquire").noPreserveCache();

describe("guardianGetRequest", function() {
  it("should throw if no URL passed", function() {
    expect(function() {
      require("../../guardian-get-request")();
    }).toThrow("Need an API request URL");
  });

  it("should throw if the URL passed does not match the api URL", function() {
    var guardianGetRequest = require("../../guardian-get-request");

    expect(function() {
      guardianGetRequest("https://api-key-steal.herokuapp.com/queries");
    }).toThrow("The host in the URL provided needs to match the guardian's")
  });

  it("should make get request to guardian URL with API key", function() {
    var requestMock = jasmine.createSpyObj("request", ["get"]);

    var credentialsMock = {
      guardian: createSpy("guardian").andReturn({ key: "key" })
    };

    var guardianGetRequest = proxyquire("../../guardian-get-request", {
      "request": requestMock,
      "./credentials": credentialsMock
    });

    guardianGetRequest("http://content.guardianapis.com/alex?show-fields=body");

    expect(requestMock.get)
      .toHaveBeenCalledWith("http://content.guardianapis.com/alex?show-fields=body&api-key=key");
  });
});
