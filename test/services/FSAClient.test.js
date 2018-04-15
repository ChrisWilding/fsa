import { readFileSync } from "fs";
import FSAClient from "../../src/services/FSAClient";

const authoritiesBasic = readFileSync(`${__dirname}/../fixtures/authorities/basic.json`);
const establishmentsManchester = readFileSync(
  `${__dirname}/../fixtures/establishments/manchester.json`
);

describe("FSAClient", () => {
  afterEach(() => {
    global.fetch.resetMocks();
  });

  describe("getAuthorities", () => {
    it("gets a list of authorities with basic information", () => {
      global.fetch.mockResponse(authoritiesBasic);

      return FSAClient.getAuthorities().then(data => {
        expect(data).toEqual([
          {
            id: 213,
            idCode: "776",
            name: "Glasgow City",
            establishmentCount: 5166,
            schemeType: 2
          },
          {
            id: 397,
            idCode: "413",
            name: "Leeds",
            establishmentCount: 5053,
            schemeType: 1
          },
          {
            id: 180,
            idCode: "415",
            name: "Manchester",
            establishmentCount: 4168,
            schemeType: 1
          }
        ]);
      });
    });

    it("handles an error response", () => {
      global.fetch.mockResponse("", {
        status: 500,
        statusText: "internal server error"
      });

      return FSAClient.getAuthorities().catch(error => {
        expect(error.message).toEqual("FSA API returned HTTP status 500 - internal server error");
      });
    });
  });

  describe("getEstablishments", () => {
    it("gets a list of authorities with basic information", () => {
      global.fetch.mockResponse(establishmentsManchester);

      return FSAClient.getEstablishments(180).then(data => {
        expect(data).toEqual({
          "0": 0,
          "1": 6,
          "2": 3,
          "3": 10,
          "4": 17,
          "5": 60,
          Exempt: 4
        });
      });
    });

    it("handles an error response", () => {
      global.fetch.mockResponse("", {
        status: 500,
        statusText: "internal server error"
      });

      return FSAClient.getAuthorities().catch(error => {
        expect(error.message).toEqual("FSA API returned HTTP status 500 - internal server error");
      });
    });
  });
});
