import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TextInput,
    Button
} from 'react-native';
import SCPViewRedux from './scpview.redux.js'
import {Styles} from './res.js';
import {newState} from './lib.js'

const _scpView = ({op, msg, host, path, success, error, password,
                   onSendBtnClicked, onHostGiven, onPathGiven, onPasswordGiven}) => {
                       let sendOrSending = null;
                       if (op == SCPViewRedux.OT.INPUT) {
                           sendOrSending = <Button
                                               onPress={onSendBtnClicked}
                                               title="Send"
                                           />
                       } else {
                           sendOrSending = <Text style={Styles.welcome}>Sending</Text>
                       }

                       return <View style={Styles.container}>
                       <Text style={Styles.welcome}>{'Message to send:\n'}{msg}</Text>
                       <View style={{flexDirection:'row'}}>
                       <TextInput placeholder='host' style={Styles.input} editable = {true}
                       onChangeText={onHostGiven}
                       value={host}
                       />
                       </View>
                       <View style={{flexDirection:'row'}}>
                       <TextInput placeholder='path' style={Styles.input} editable = {true}
                       onChangeText={onPathGiven}
                       value={path}
                       />
                       </View>
                       <View style={{flexDirection:'row'}}>
                       <TextInput placeholder='password' style={Styles.input} editable = {true}
                       onChangeText={onPasswordGiven}
                       value={password}
                       />
                       </View>
                       {sendOrSending}
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
        onSendBtnClicked: () => dispatch(SCPViewRedux.Action.send()),
        onPasswordGiven: pass => dispatch(SCPViewRedux.Action.password(pass)),
        onHostGiven: host => dispatch(SCPViewRedux.Action.host(host)),
        onPathGiven: path => dispatch(SCPViewRedux.Action.path(path)),
    })
)(_scpView);
export default SCPView;
