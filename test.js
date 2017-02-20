import {OT, AT, Resource, Action, Reducer} from './pojo.js';

test('reducer', ()=>{
    expect(
        Reducer(undefined, {})
    ).toEqual(
        {camPerm: false, op: OT.MENU}
    );
    expect(
        Reducer({}, Action.camPermission(true))
    ).toEqual(
        { camPerm: true }
    );
    expect(
        Reducer(Reducer(undefined, {}), Action.camPermission(true))
    ).toEqual(
        { camPerm: true, op: OT.MENU}
    );
});
