'use strict';
import AppRedux from './app.redux.js';

test('reducer', ()=>{
    expect(
        AppRedux.Reducer(undefined, {})
    ).toEqual(
        {"camPerm": false, "op": "menu", "qrcode": null}
    );
    expect(
        AppRedux.Reducer({}, AppRedux.Action.camPermission(true))
    ).toEqual(
        { camPerm: true }
    );
    expect(
        AppRedux.Reducer(AppRedux.Reducer(undefined, {}), AppRedux.Action.camPermission(true))
    ).toEqual(
        {"camPerm": true, "op": "menu", "qrcode": null}
    );
});
