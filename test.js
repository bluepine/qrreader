import {OT, AT, Resource, Action, Reducer} from './pojo.js';

test('reducer', ()=>{
    expect(
        Reducer.permChange({}, Action.camPermission(true))
    ).toEqual(
        { camPerm: true }
    );
});
