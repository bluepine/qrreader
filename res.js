'use strict';
import {StyleSheet} from 'react-native';
const Resource = {
    CAM_PERMISSION_REQUEST_MSG : 'QRCode scanner needs access to your camera so you can scan qr codes.'
};

/////////styles
const Styles = StyleSheet.create({
    multiline: {
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        flex: 1,
        fontSize: 13,
        height: 50,
        padding: 4,
        marginBottom: 4
    },
    input: {
        flex:0.8,
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
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
