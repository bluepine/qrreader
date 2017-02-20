import {OT, Resource, Action, Reducer} from './pojo.js';

test('reducer', ()=>{
    expect(
        Reducer(undefined, {})
    ).toEqual(
        {"camPerm": false, "op": "menu", "qrcode": null}
    );
    expect(
        Reducer({}, Action.camPermission(true))
    ).toEqual(
        { camPerm: true }
    );
    expect(
        Reducer(Reducer(undefined, {}), Action.camPermission(true))
    ).toEqual(
        {"camPerm": true, "op": "menu", "qrcode": null}
    );
});
