import React from 'react';
import {shallow, mount} from 'enzyme/build';
import {NewsPage} from '../../pages/News';


const setup = (props = {}, state = null) => {
    const defaultProps = {
        location: {search: "category=health"},
        news: {data: {articles: []}},
        fetchNewsSources: jest.fn(),
        fetchNews: jest.fn(),
        sources: {
            data: [
                "argaam",
                "australian-financial-review",
                "bloomberg"
            ]
        }
    };
    const setUpProps = {...defaultProps, ...props};
    const wrapper = shallow(<NewsPage {...setUpProps}/>);
    const tree = () => setTimeout(() => renderer.create(<NewsPage {...setUpProps}/>).toJSON());
    if (state) wrapper.setState(state);
    return {wrapper, props: setUpProps, tree};
};

let wrapper, props;

beforeEach(() => {
    const setupWrapper = setup({}, {query: location.search, samePage: true});
    wrapper = setupWrapper.wrapper;
    props = setupWrapper.props;
});

afterEach(() => {
    wrapper.unmount();
});

describe("News component", () => {
    it('Should render', () => {
        expect(wrapper.find('.news-detail').length).toBe(1);
    });

    it('componentDidMount Should call new actions to fetch with category', () => {
        expect(props.fetchNewsSources).toHaveBeenCalled();
        expect(props.fetchNewsSources).toHaveBeenCalledTimes(1);
        expect(props.fetchNewsSources).toHaveBeenCalledWith('sources', props.location.search);
    });

    it('Equal array function should return true or false if equal or not', () => {
        const {arraysEqual} = wrapper.instance();
        expect(arraysEqual(['a', 'b'], ['a', 'b'])).toBeTruthy();
        expect(arraysEqual(['a', 'b'], ['a', 'c'])).toBeFalsy();
    });


    it('componentDidUpdate should update component if category and sources change', () => {
        const spyGetNewPerSource = jest.spyOn(wrapper.instance(), "getNewPerSource");
        const newData = {
            data: [
                "argaam",
                "australian-financial-review",
            ]
        };
        wrapper.setProps({
            sources: newData,
            location: {search: "category=game"}
        });

        expect(spyGetNewPerSource).toBeCalled();
        expect(spyGetNewPerSource).toBeCalledWith(newData.data, {search: "category=game"});
        //
        // expect(props.fetchNews).toBeCalled();
        // expect(props.fetchNews).toBeCalledWith('everything', 'sources=' + [
        //     "argaam",
        //     "australian-financial-review",
        // ]);
    });

});

