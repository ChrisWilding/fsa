import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import fetch from "jest-fetch-mock";

Enzyme.configure({ adapter: new Adapter() });

global.fetch = fetch;
