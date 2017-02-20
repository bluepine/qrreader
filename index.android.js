'use strict';
import {OT, Resource, Action, Reducer} from './pojo.js';
////////////////////////react native dependency starts here
import QRView from './qrview.js';
import { createStore, combineReducers } from 'redux';
import React, {Component, PropTypes} from 'react';
import { connect, Provider } from 'react-redux';
import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    PermissionsAndroid
} from 'react-native';
import './pojo.js';

////////////components

const _app = ({camPermissionGranted,
               currentOperation,
               onCamPermissionGranted,
               onQrCodeDecoded,
               qrcodeText,
               onStartQrViewButtonClicked}) => {
    if (!camPermissionGranted) {
        requestCameraPermission(onCamPermissionGranted);
        return <Text style={styles.instructions}>{Resource.CAM_PERMISSION_REQUEST_MSG}</Text>
    }
    if (currentOperation === OT.QRVIEW) {
        return <QRView
                   style={styles.container}
                   onQrCodeDecoded={onQrCodeDecoded}
               />
    }
    if (currentOperation === OT.MENU) {
        return (
        <View style={styles.container}>
        <Text style={styles.welcome}>
         {qrcodeText}
        </Text>
        <Button
            onPress={onStartQrViewButtonClicked}
            title="Scan QR code"
            color="#841584"
            accessibilityLabel="Scan QR code"
        />
        </View>
        )
    }

    return <Text style={styles.welcome}>App is in unknown state</Text>

};

_app.propTypes = {
    camPermissionGranted: PropTypes.bool.isRequired,
    currentOperation: PropTypes.string.isRequired,
    qrcodeText: PropTypes.string.isRequired,
    onCamPermissionGranted: PropTypes.func.isRequired,
    onQrCodeDecoded: PropTypes.func.isRequired,
    onStartQrViewButtonClicked: PropTypes.func.isRequired
};

const App = connect(
    (state) => ({
        camPermissionGranted : state.camPerm,
        currentOperation: state.op,
        qrcodeText: state.qrcode === null ? 'No qrcode scanned' :`last scanned qrcode: ${state.qrcode}`
    }),
    (dispatch) => ({
        onCamPermissionGranted: (granted) => dispatch(Action.camPermission(granted)),
        onQrCodeDecoded: (msg) => dispatch(Action.qrcode(msg)),
        onStartQrViewButtonClicked: () => dispatch(Action.qrview())
    })
)(_app);

///////////fire it up
const store = createStore(Reducer);
console.log(store.getState())
export default class qrcode_scanner extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    };
}
AppRegistry.registerComponent('qrcode_scanner', () => qrcode_scanner);





//////////lower level operations
async function requestCameraPermission(callback) {
    try {
        const granted = await PermissionsAndroid.request(
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
        alignItems: 'center'
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
