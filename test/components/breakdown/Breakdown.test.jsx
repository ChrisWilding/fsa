import React from "react";
import { shallow } from "enzyme";

import Breakdown from "../../../src/components/breakdown/Breakdown";

describe("Breakdown", () => {
  const props = {
    breakdown: {
      "0": 0,
      "1": 6,
      "2": 3,
      "3": 10,
      "4": 17,
      "5": 60,
      Exempt: 4
    }
  };

  let component;

  beforeEach(() => {
    component = shallow(<Breakdown {...props} />);
  });

  it("renders a heading", () => {
    const ths = component.find("th");
    expect(ths).toHaveLength(2);
    expect(ths.first().text()).toEqual("Rating");
    expect(ths.last().text()).toEqual("Percentage");
  });

  it("renders 7 rows including the header", () => {
    expect(component.find("tr")).toHaveLength(7);
  });

  it("renders the star rating and percentage for a row", () => {
    const tr = component.find("tr").at(1);
    const tds = tr.find("td");

    expect(tds).toHaveLength(2);
    expect(tds.first().text()).toEqual("5-star");
    expect(tds.last().text()).toEqual("60%");
  });

  it("renders the exempt rating and percentage for a row", () => {
    const tr = component.find("tr").last();
    const tds = tr.find("td");

    expect(tds).toHaveLength(2);
    expect(tds.first().text()).toEqual("Exempt");
    expect(tds.last().text()).toEqual("4%");
  });
});
