// following design guides here: https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
'use strict';
////////////imports
import { createStore, combineReducers } from 'redux';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

const QRView = require('./qrview');

////////////globals
const OT {
    //operation type
    MENU : Symbol('menu'),
    QRVIEW : Symbol('qrview')
}
const AT = {
    //redux action type
    CAM_PERM_CHANGE : Symbol('CAM_PERM_CHANGE')
}

const Resource = {
    CAM_PERMISSION_REQUEST_MSG : 'QRCode scanner needs access to your camera so you can scan qr codes.'
}


////////////action creators
//loosely following https://github.com/acdlite/redux-actions for action format
const Action = {
    camPermission : (granted) => ({type: AT.CAM_PERM_CHANGE, payload: granted}),
}

////////////components
const App = () => connect()(
    (state) => ({camPermissionGranted : state.camPermissionGranted, currentOperation: state.operation}),
    (dispatch) => ({onCamPermissionGranted: (granted) => dispatch(Action.camPermission(granted))})
)((_=>{
    const app = ({camPermissionGranted, currentOperation, onCamPermissionGranted}) => {
        if (!camPermissionGranted){
            requestCameraPermission(onCamPermissionGranted);
            return <Text style={styles.instructions}>{Resource.CAM_PERMISSION_REQUEST_MSG}</Text>
        }
        return <Text style={styles.welcome}>WIP</Text>
    };
    app.propTypes = {
        camPermissionGranted: PropTypes.bool.isRequired,
        currentOperation: PropTypes.symbol.isRequired,
        onCamPermissionGranted: PropTypes.func.isRequired
    };
})());

///////////reducers
const InitState = {camPerm: false, op: QT.MENU};
const _rg = handlers => (state = InitState, action)  => action.type in handlers ? handlers[action.type](state, action) : console.log(`action type ${action.type} not handled`);

const Reducer = {
    permChange: _rg({
        [AT.CAM_PERM_CHANGE] : (state, action) => ({...state, camPerm: action.payload})
    })
}

const store = createStore(combineReducers(Reducer));

export default class qrcode_scanner extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('qrcode_scanner', () => qrcode_scanner);





////lib
async function requestCameraPermission(callback) {
    try {
        const granted = await PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': 'QRCode scanner App Camera Permission',
                'message': Resource.CAM_PERMISSION_REQUEST_MSG
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
            callback(true)
        } else {
            console.log("Camera permission denied")
            callback(false)
        }
    } catch (err) {
        console.warn(err)
    }
}


/////////styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});


// const onScanButtonPressed = () => {
// };

/* <Button
 * onPress={onScanButtonPressed}
 * title="Scan"
 * color="#841584"
 * accessibilityLabel="Scan"
 * />*/
/* <View style={styles.container}>*/

/* <QRView style={styles.container}/>*/
