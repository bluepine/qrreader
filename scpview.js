import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TextInput
} from 'react-native';
import SCPViewRedux from './scpview.redux.js'
import {Styles} from './res.js';
import {newState} from './lib.js'

const _scpView = ({op, msg, host, path, success, error, password}) => {
    return <View style={Styles.container}>
    <Text style={Styles.welcome}>{'Message to send:\n'}{msg}</Text>
    <View style={{flexDirection:'row'}}>
        <TextInput placeholder='host' style={Styles.input} editable = {true} />
    </View>
    <View style={{flexDirection:'row'}}>
        <TextInput placeholder='path' style={Styles.input} editable = {true} />
    </View>
    <View style={{flexDirection:'row'}}>
        <TextInput placeholder='password' style={Styles.input} editable = {true} />
    </View>
    </View>
};
_scpView.propTypes = {
    msg: PropTypes.string.isRequired,
    op: PropTypes.string.isRequired,
    host: PropTypes.string,
    path: PropTypes.string,
    success: PropTypes.bool.isRequired,
    error: PropTypes.string,
    password: PropTypes.string
};
SCPView = connect(
    (state) => (newState(state[SCPViewRedux.Name])),
    (dispatch) => ({
    })
)(_scpView);
export default SCPView;
