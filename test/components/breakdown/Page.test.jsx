import React from "react";
import { shallow } from "enzyme";

import Page from "../../../src/components/breakdown/Page";

describe("Page", () => {
  const authorities = [
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
  ];

  const breakdown = {
    "0": 0,
    "1": 6,
    "2": 3,
    "3": 10,
    "4": 17,
    "5": 60,
    Exempt: 4
  };

  it("renders an error", () => {
    const component = shallow(<Page />);
    component.setState({
      error: true
    });

    expect(component.text()).toEqual(
      "Opps, sorry, something went wrong. Please refresh the page and try again."
    );
  });

  it("renders loading", () => {
    const component = shallow(<Page />);

    expect(component.text()).toEqual("Loading . . .");
  });

  it("renders a select authority component with a list of authorities", () => {
    const component = shallow(<Page />);
    component.setState({
      authorities,
      breakdown: null,
      loading: false,
      selectedAuthorityId: "default"
    });

    const selectAuthority = component.find("SelectAuthority");

    expect(selectAuthority.exists()).toBeTruthy();
    expect(selectAuthority.prop("value")).toEqual("default");
  });

  it("does not render a breakdown when the breakdown data is not present", () => {
    const component = shallow(<Page />);
    component.setState({
      authorities,
      breakdown: null,
      loading: false,
      selectedAuthorityId: "default"
    });

    const breakdownComponent = component.find("Breakdown");

    expect(breakdownComponent.exists()).toBeFalsy();
  });

  it("renders a breakdown when the breakdown data is present", () => {
    const component = shallow(<Page />);
    component.setState({
      authorities,
      breakdown,
      loading: false,
      selectedAuthorityId: "180"
    });

    const breakdownComponent = component.find("Breakdown");

    expect(breakdownComponent.exists()).toBeTruthy();
    expect(breakdownComponent.prop("breakdown")).toEqual(breakdown);
  });
});
