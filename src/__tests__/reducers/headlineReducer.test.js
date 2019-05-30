import headlineReducers from "../../reducers/headlineReducer";
import {CAR_DETAIL} from "../../constants/actionTypes";

describe("Headline Reducer", () => {
    it('should return current state if no action is passed as default', () => {
        expect(headlineReducers({}, {type: undefined})).toBe(JSON.stringify({}));
    });

    it('should add news after action dispatch with payload', () => {
        expect(JSON.stringify(headlineReducers({}, {
            type: CAR_DETAIL, payload: {
                articles: [{
                    author: null,
                    content: "Shailene Woodley is opening up about her experience living in France!",
                    description: "Watch inside!",
                    publishedAt: "2019-05-30T05:09:59Z",
                    source: {id: null, name: "Justjared.com"},
                    title: "Shailene Woodley Experienced Culture Shock While Living in France – Watch! - Just Jared",
                    url: "http://www.justjared.com/2019/05/30/shailene-woodley-experienced-culture-shock-while-living-in-france-watch/",
                    urlToImage: "http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2019/05/shailene-ellen-social.jpg"
                }]
            },
        }))).toBe(JSON.stringify());
    });

});


