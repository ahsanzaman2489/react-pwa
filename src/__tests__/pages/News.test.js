import React from 'react';
import {shallow} from 'enzyme/build';
import {NewsPage} from '../../pages/News';


const setup = (props = {}, state = null) => {
    const defaultProps = {
        location: {search: "category=health"},
        news: {
            data: {
                articles: [{
                    author: "https://www.facebook.com/DailyMail",
                    title: "Four tiger poachers are killed in a Bangladesh mangrove after shootout with police"
                }]
            }
        },
        fetchNewsSources: jest.fn(),
        fetchNews: jest.fn(),
        history: {
            location: {search: "category=health"},
            push: jest.fn()
        },
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

let wrapper, props,tree;

beforeEach(() => {
    const setupWrapper = setup({}, {query: location.search, samePage: true});
    wrapper = setupWrapper.wrapper;
    props = setupWrapper.props;
    tree = setupWrapper.tree;
});

afterEach(() => {
    wrapper.unmount();
});

describe("News component", () => {
    it('Should render', () => {
        expect(wrapper.find('.news-detail').length).toBe(1);
    });

    it('should match with snapshot', () => {
        expect(tree()).toMatchSnapshot();
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
        expect(arraysEqual(['a', 'b'], null)).toBeFalsy();
    });


    it('componentWillReceiveProps should update component if URL will change with same category', () => {
        const spyGetNewPerSource = jest.spyOn(wrapper.instance(), "getNewPerSource");

        wrapper.setProps({
            location: {search: "category=health&page=2"}
        });

        expect(spyGetNewPerSource).toBeCalled();
        expect(spyGetNewPerSource).toBeCalledWith(props.sources.data, {search: "category=health&page=2"});

    });

    it('componentWillReceiveProps should update component if category change then fetch news accordingly', () => {
        const spyGetNewPerSource = jest.spyOn(wrapper.instance(), "getNewPerSource");
        const newData = {
            data: [
                "argaam",
                "australian-financial-review",
            ]
        };
        wrapper.setProps({
            location: {search: "category=game"}
        });

        expect(props.fetchNewsSources).toBeCalled();
        expect(props.fetchNewsSources).toBeCalledWith('sources', 'category=game');

        wrapper.setProps({
            sources: newData
        });

        expect(spyGetNewPerSource).toBeCalled();
        expect(spyGetNewPerSource).toBeCalledWith(newData.data, {search: "category=game"});

    });

    it('getNewPerSource function call fetchnews with removed category from URL', () => {
        const {getNewPerSource} = wrapper.instance();

        getNewPerSource(props.sources.data, {search: "?category=sports&page=2"});
        expect(props.fetchNews).toBeCalled();
        expect(props.fetchNews).toBeCalledWith('everything', 'page=2&sources=' + props.sources.data.join());
    });



});

