'use strict';
import {Resource, Styles} from './res.js'
import SCPViewRedux from './scpview.redux.js'
import AppRedux from './app.redux.js'
////////////////////////react native dependency starts here
import { createStore, combineReducers, applyMiddleware } from 'redux';
import React, {Component, PropTypes} from 'react';
import { connect, Provider } from 'react-redux';
import {
    Button,
    AppRegistry,
    Text,
    View,
    BackAndroid,
    ScrollView
} from 'react-native';
import createLogger from 'redux-logger';
import {requestCameraPermission} from './lib.android.js'
import QRView from './qrview.js';
import SCPView from './scpview.js'

////////////control flags
const LOG_REDUX = false;
////////////components

const _app = (
    {camPermissionGranted,
     currentOperation,
     onCamPermissionGranted,
     onQrCodeDecoded,
     qrcodeText,
     onStartQrViewButtonClicked,
     onSendQrCodeButtonClicked}) => {
         if (!camPermissionGranted) {
             requestCameraPermission(onCamPermissionGranted);
             return (
                 <Text style={Styles.instructions}>{Resource.CAM_PERMISSION_REQUEST_MSG}</Text>
             )
         }
         if (currentOperation === AppRedux.OT.QRVIEW) {
             return (
                 <QRView
                     style={Styles.container}
                     onQrCodeDecoded={onQrCodeDecoded}
                 />
             )
         }
         if (currentOperation === AppRedux.OT.MENU) {
             return (
                 <ScrollView contentContainerStyle={Styles.container}>
                     <Text style={Styles.welcome}>
                         {qrcodeText}
                     </Text>
                     <Text style={Styles.welcome}>-----</Text>
                     <Button
                         onPress={onStartQrViewButtonClicked}
                         title="Scan QR code"
                     />
                     <Text style={Styles.welcome}>-----</Text>
                     <Button
                         onPress={onSendQrCodeButtonClicked}
                         title="Send QR code"
                     />
                 </ScrollView>
             )
         }

         if (currentOperation === AppRedux.OT.SENDCODE) {
             return (
                 <SCPView/>
             )
         }

         return (
             <Text style={Styles.welcome}>App is in unknown state</Text>
         )

     };

_app.propTypes = {
    camPermissionGranted: PropTypes.bool.isRequired,
    currentOperation: PropTypes.string.isRequired,
    qrcodeText: PropTypes.string.isRequired,
    onCamPermissionGranted: PropTypes.func.isRequired,
    onQrCodeDecoded: PropTypes.func.isRequired,
    onStartQrViewButtonClicked: PropTypes.func.isRequired,
    onSendQrCodeButtonClicked: PropTypes.func.isRequired
};

const onQrCodeDecoded = dispatch => msg => {dispatch(AppRedux.Action.qrcode(msg)), dispatch(SCPViewRedux.Action.init(msg))};

const App = connect(
    (state) => ({
        camPermissionGranted : state[AppRedux.Name].camPerm,
        currentOperation: state[AppRedux.Name].op,
        qrcodeText: state[AppRedux.Name].qrcode === null ? 'No qrcode scanned' :`last scanned qrcode: ${state[AppRedux.Name].qrcode}`
    }),
    (dispatch) => ({
        onCamPermissionGranted: (granted) => dispatch(AppRedux.Action.camPermission(granted)),
        onQrCodeDecoded: onQrCodeDecoded(dispatch),
        onStartQrViewButtonClicked: () => dispatch(AppRedux.Action.qrview()),
        onSendQrCodeButtonClicked: () => dispatch(AppRedux.Action.sendcode())
    })
)(_app);

///////////fire it up
const store = createStore(combineReducers({
    [AppRedux.Name]: AppRedux.Reducer,
    [SCPViewRedux.Name]: SCPViewRedux.Reducer
}),
                          LOG_REDUX ? applyMiddleware(createLogger()) : undefined
);

//testing steps
/* store.dispatch(AppRedux.Action.camPermission(true))
 * onQrCodeDecoded(store.dispatch)('testcode')
 * store.dispatch(AppRedux.Action.sendcode())
 * store.dispatch(SCPViewRedux.Action.password('pass'))
 * store.dispatch(SCPViewRedux.Action.host('user@host'))
 * store.dispatch(SCPViewRedux.Action.path('/home/user/file'))
 * store.dispatch(SCPViewRedux.Action.send())
 * */
console.log(store.getState())
BackAndroid.addEventListener('hardwareBackPress', () => store.dispatch(AppRedux.Action.menu()));

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
