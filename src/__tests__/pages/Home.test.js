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

let wrapper, props, tree;

beforeEach(() => {
    const setupWrapper = setup();
    wrapper = setupWrapper.wrapper;
    props = setupWrapper.props;
    tree = setupWrapper.tree;
});

afterEach(() => {
    wrapper.unmount();
});

describe("Home component", () => {
    it('should match with snapshot', () => {
        expect(tree()).toMatchSnapshot();
    });
    it('Should render', () => {
        expect(wrapper.find('CardColumns').length).toBe(1);
        expect(wrapper.find('h1').length).toBe(1);
    });

    it('componentDidMount Should call top headline actions to fetch', () => {
        expect(props.fetchHeadLines).toHaveBeenCalled();
        expect(props.fetchHeadLines).toHaveBeenCalledTimes(1);
        expect(props.fetchHeadLines).toHaveBeenCalledWith('top-headlines', 'country=us');
    });

});

