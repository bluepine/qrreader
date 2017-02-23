'use strict';
import {Resource} from './res.js';
import {
    PermissionsAndroid
} from 'react-native';

async function requestCameraPermission(callback) {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': 'QRCode scanner App Camera Permission',
                'message': Resource.CAM_PERMISSION_REQUEST_MSG
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
            callback(true);
        } else {
            console.log("Camera permission denied");
            callback(false);
        }
    } catch (err) {
        console.warn(err);
    }
};

export {requestCameraPermission};
