import FSAClient from "../../src/services/FSAClient";

describe("FSAClient", () => {
  describe("getAuthorities", () => {
    it("gets a list of authorities with basic information", () =>
      FSAClient.getAuthorities().then(data => {
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
      }));
  });

  describe("getEstablishments", () => {
    it("gets a list of authorities with basic information", () =>
      FSAClient.getEstablishments(180).then(data => {
        expect(data).toEqual({
          "0": 0,
          "1": 6,
          "2": 3,
          "3": 10,
          "4": 17,
          "5": 60,
          Exempt: 4
        });
      }));
  });
});
