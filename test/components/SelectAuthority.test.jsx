import React from "react";
import { shallow } from "enzyme";

import SelectAuthority from "../../src/components/breakdown/SelectAuthority";

describe("SelectAuthority", () => {
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

  it("renders a default option", () => {
    const props = {
      authorities: [],
      onChange: () => {},
      value: "default"
    };

    const component = shallow(<SelectAuthority {...props} />);

    expect(component.find("option").length).toEqual(1);
  });

  it("renders an option for each authority", () => {
    const props = {
      authorities,
      onChange: () => {},
      value: "default"
    };

    const component = shallow(<SelectAuthority {...props} />);

    expect(component.find("option")).toHaveLength(4);
  });

  it("renders each option with an id and text", () => {
    const props = {
      authorities,
      onChange: () => {},
      value: "default"
    };

    const component = shallow(<SelectAuthority {...props} />);
    const option = component.find("option").last();

    expect(option.prop("value")).toEqual(180);
    expect(option.text()).toEqual("Manchester");
  });

  it("calls the onChange callback on selection change", () => {
    const props = {
      authorities,
      onChange: jest.fn(),
      value: "default"
    };

    const event = { target: { value: "180" } };

    const component = shallow(<SelectAuthority {...props} />);
    const select = component.find("select");
    select.simulate("change", event);

    expect(props.onChange).toBeCalledWith(event);
  });
});
