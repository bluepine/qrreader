'use strict';
import {generateReducer, newState, applyName} from './lib.js';
////////////scp view
const Name = 'SCPViewRedux';
const OT = {
    INPUT : 'input',
    SEND : 'send'
};
const AT = applyName(Name, {
    INIT: Name+'.INIT',
    SEND: Name+'.SEND',
    DONE: 'DONE'
});
const Action = {
    init : (msg) => ({type: AT.INIT, payload: msg}),
    send : (host, path, password) => ({type: AT.SEND, payload: {host, path, password}}),
    done : (success, error) => ({type: AT.DONE, payload: {success, error}})
};
const Reducer = generateReducer(
    {
        [AT.INIT] : (state, action) => {
            console.log(action);
            return newState(state, {
                op: OT.INPUT,
                msg: action.payload,
                success: false,
                error: null
            });},

        [AT.SEND] : (state, action) => (newState(state, {
            op: OT.SEND,
            host: action.payload.host,
            path: action.payload.path,
            password: action.payload.password
        })),

        [AT.DONE] : (state, action) => (newState(state, {
            op: OT.INPUT,
            success: action.payload.success,
            error: action.payload.error
        }))
    },
    {msg: null, op: OT.INPUT, host: null, path: null, success: false, error: null, password: null}
);

const SCPViewRedux = {Action, Reducer, Name};
export default SCPViewRedux;
