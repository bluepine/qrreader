'use strict';
import {StyleSheet} from 'react-native';
const Resource = {
    CAM_PERMISSION_REQUEST_MSG : 'QRCode scanner needs access to your camera so you can scan qr codes.'
};

/////////styles
const Styles = StyleSheet.create({
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
export {Resource, Styles};
