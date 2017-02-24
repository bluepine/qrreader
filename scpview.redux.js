'use strict';
import {generateReducer, newState, applyName} from './lib.js';
////////////scp view
const Name = 'SCPViewRedux';
const OT = {
    INPUT : 'input',
    SEND : 'send'
};
const AT = applyName(Name, {
    INIT: 'INIT',
    SEND: 'SEND',
    DONE: 'DONE',
    PASS: 'PASS',
    HOST: 'HOST',
    PATH: 'PATH'
});
const Action = {
    init : msg => ({type: AT.INIT, payload: msg}),
    send : () => ({type: AT.SEND}),
    done : (success, error) => ({type: AT.DONE, payload: {success, error}}),
    password : password => ({type: AT.PASS, payload: password}),
    host : host => ({type: AT.HOST, payload: host}),
    path : path => ({type: AT.PATH, payload: path})
};
const Reducer = generateReducer(
    {
        [AT.INIT] : (state, action) => (
            newState(state, {
                op: OT.INPUT,
                msg: action.payload,
                success: false,
                error: null
            })),

        [AT.SEND] : (state, action) => (newState(state, {
            op: OT.SEND
        })),

        [AT.DONE] : (state, action) => (newState(state, {
            op: OT.INPUT,
            success: action.payload.success,
            error: action.payload.error
        })),

        [AT.PASS] : (state, action) => (newState(state, {
            password: action.payload})),

        [AT.HOST] : (state, action) => (newState(state, {
            host: action.payload})),

        [AT.PATH] : (state, action) => (newState(state, {
            path: action.payload}))
    },
    {msg: null, op: OT.INPUT, host: null, path: null, success: false, error: null, password: null}
);

const SCPViewRedux = {Action, Reducer, Name, OT};
export default SCPViewRedux;
