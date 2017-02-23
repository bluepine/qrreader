const generateReducer = (handlers, initState) => (state = initState, action)  => {
    if (!action.hasOwnProperty('type')) {
        console.log(`no type in action: ${action}`);
        return state;
    }
    return action.type in handlers ? handlers[action.type](state, action) : state;
};
const newState = (state, change) =>  Object.assign({}, state, change);

export {generateReducer, newState};
