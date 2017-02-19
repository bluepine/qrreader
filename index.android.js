/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import { createStore } from 'redux';
import React, {Component } from 'react';
import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

const QRView = require('./qrview');

const onScanButtonPressed = () => {
};

/* <Button
 * onPress={onScanButtonPressed}
 * title="Scan"
 * color="#841584"
 * accessibilityLabel="Scan"
 * />*/
/* <View style={styles.container}>*/

/* <QRView style={styles.container}/>*/
const store = createStore(counter);

export default class qrcode_scanner extends Component {
    render() {
        return (
                <Navigator initialRoute = {store.route}/>
                
        );
    }
}

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

AppRegistry.registerComponent('qrcode_scanner', () => qrcode_scanner);
