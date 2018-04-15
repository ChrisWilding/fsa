import React from "react";
import { shallow } from "enzyme";

import App from "../../src/components/App";
import BreakdownPage from "../../src/components/breakdown/Page";

describe("App", () => {
  it("renders a breakdown page", () => {
    const component = shallow(<App />);
    expect(component.find(BreakdownPage).exists()).toBeTruthy();
  });
});
