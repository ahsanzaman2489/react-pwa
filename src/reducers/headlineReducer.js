export default (state = {}, action) => {
    switch (action.type) {
        case 'HEADLINE_LIST':
            console.log(action);
            return state = {...action.payload};
        default:
            return state
    }
}