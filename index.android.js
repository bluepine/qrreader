'use strict';
import {OT, Action, Reducer} from './app.redux.js';
import {Resource, Styles} from './res.js'
////////////////////////react native dependency starts here
import { createStore, combineReducers } from 'redux';
import React, {Component, PropTypes} from 'react';
import { connect, Provider } from 'react-redux';
import {
    Button,
    AppRegistry,
    Text,
    View,
    ToastAndroid,
    PermissionsAndroid,
    BackAndroid
} from 'react-native';
import {requestCameraPermission} from './lib.android.js'
import QRView from './qrview.js';
import SCPView from './scpview.js'

////////////components

const _app = (
    {camPermissionGranted,
     currentOperation,
     onCamPermissionGranted,
     onQrCodeDecoded,
     qrcodeText,
     onStartQrViewButtonClicked}) => {
         if (!camPermissionGranted) {
             requestCameraPermission(onCamPermissionGranted);
             return <Text style={Styles.instructions}>{Resource.CAM_PERMISSION_REQUEST_MSG}</Text>
         }
         if (currentOperation === OT.QRVIEW) {
             return <QRView
                        style={Styles.container}
                        onQrCodeDecoded={onQrCodeDecoded}
                    />
         }
         if (currentOperation === OT.MENU) {
             return (
                 <View style={Styles.container}>
                     <Text style={Styles.welcome}>
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

         if (currentOperation === OT.SENDCODE) {
             return (
                 <SCPView msg={state.qrcode}/>
             )
         }

         return <Text style={Styles.welcome}>App is in unknown state</Text>

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
BackAndroid.addEventListener('hardwareBackPress', () => store.dispatch(Action.menu()));

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
