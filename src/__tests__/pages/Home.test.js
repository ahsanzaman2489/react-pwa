import React from 'react';
import {shallow} from 'enzyme/build';
import {HomePage} from '../../pages/Home';


const setup = (props = {}, state = null) => {
    const defaultProps = {
        fetchHeadLines: jest.fn(),
        headlines: {articles: []}
    };
    const setUpProps = {...defaultProps, ...props};
    const wrapper = shallow(<HomePage {...setUpProps}/>);
    const tree = () => setTimeout(() => renderer.create(<HomePage {...setUpProps}/>).toJSON());
    if (state) wrapper.setState(state);
    return {wrapper, props: setUpProps, tree}
};

let wrapper, props;

beforeEach(() => {
    const setupWrapper = setup();
    wrapper = setupWrapper.wrapper;
    props = setupWrapper.props;
});
describe("Home component", () => {
    it('Should render', () => {
        console.log(wrapper.debug())
        expect(wrapper.find('CardColumns').length).toBe(1)
        expect(wrapper.find('h1').length).toBe(1)

        expect(props.fetchHeadLines).toHaveBeenCalled()
        expect(props.fetchHeadLines).toHaveBeenCalledTimes(1);
    });
});

