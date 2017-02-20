// following design guides here: https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
////////////globals
//operation type
const OT = {
    MENU : 'menu',
    QRVIEW : 'qrview'
};
//redux action type
const AT = {
    CAM_PERM_CHANGE : 'CAM_PERM_CHANGE'
};

const Resource = {
    CAM_PERMISSION_REQUEST_MSG : 'QRCode scanner needs access to your camera so you can scan qr codes.'
};


////////////action creators
//loosely following https://github.com/acdlite/redux-actions for action format
const Action = {
    camPermission : (granted) => ({type: AT.CAM_PERM_CHANGE, payload: granted})
};

///////////reducers and inital state
const _rg = (handlers, initState) => (state = initState, action)  => {
    if (!action.hasOwnProperty('type')) {
        console.log(`no type in action: ${action}`);
        return state;
    }
    return action.type in handlers ? handlers[action.type](state, action) : state;
};
const _newState = (state, change) =>  Object.assign({}, state, change);
const Reducer = _rg(
    {
        [AT.CAM_PERM_CHANGE] : (state, action) => (_newState({camPerm: action.payload}))
    },
    {camPerm: false, op: OT.MENU}
);


export {OT, AT, Resource, Action, Reducer};
