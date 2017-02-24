const generateReducer = (handlers, initState) => (state = initState, action)  => {
    if (!action.hasOwnProperty('type')) {
        console.log(`no type in action: ${action}`);
        return state;
    }
    return action.type in handlers ? handlers[action.type](state, action) : state;
};
const newState = (state, change) =>  Object.assign({}, state, change);

function applyName(name, input) {
    const tmp = {};
    const keys = Object.keys(input);
    for (var j=0; j < keys.length; j++) {
        tmp[keys[j]] = input[keys[j]]+'.'+name;
    }
    return tmp;
}
export {generateReducer, newState, applyName};
