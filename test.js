'use strict';
import AppRedux from './app.redux.js';
import SCPViewRedux from './scpview.redux.js';
test('reducer', ()=>{
    expect(
        AppRedux.Reducer(undefined, {type: null})
    ).toEqual(
        {"camPerm": false, "op": "menu", "qrcode": null}
    );
    expect(
        AppRedux.Reducer({}, AppRedux.Action.camPermission(true))
    ).toEqual(
        { camPerm: true }
    );
    expect(
        AppRedux.Reducer(AppRedux.Reducer(undefined, {type: null}), AppRedux.Action.camPermission(true))
    ).toEqual(
        {"camPerm": true, "op": "menu", "qrcode": null}
    );
    expect(
        SCPViewRedux.Reducer(SCPViewRedux.Reducer(undefined, {type: null}), SCPViewRedux.Action.init('abc'))
    ).toEqual(
        {msg: 'abc', op: SCPViewRedux.OT.INPUT, host: null, path: null, success: false, error: null, password: null}
    );
});
