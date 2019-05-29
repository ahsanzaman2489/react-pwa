import React from 'react';
import {shallow} from 'enzyme/build';
import App from '../App';

describe("App component", () => {
    it('Should render without crashing', () => {
        const wrapper = shallow(<App/>)
        expect(wrapper.find("BrowserRouter").length).toBe(1);
        expect(wrapper.find("Route").length).toBeGreaterThan(0);
    });
});
