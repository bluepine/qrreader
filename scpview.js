import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TextInput,
    Button,
    ScrollView
} from 'react-native';
import SCPViewRedux from './scpview.redux.js'
import {Styles} from './res.js';
import {newState} from './lib.js'
import SSH from 'react-native-ssh';

const sendMsg = (msg, host, path, password, onSuccess, onFailure) => {
    [user, host] = host.split('@');
    config = {user, host, password};
    command = `echo ${msg} > ${path}`;
    console.log(config)
    console.log(command)
    SSH.execute(config, command).then(
        result => {console.log('result:', result); onSuccess()},
        error =>  console.log('Error:', onFailure(error))
    );
};
const empty = () => (false);
const _scpView = ({op, msg, host, path, success, error, password,
                   onSendBtnClicked, onHostGiven, onPathGiven, onPasswordGiven, onSuccess, onFailure}) => {
                       const input = op == SCPViewRedux.OT.INPUT
                       let sendOrSending = null;
                       if (input) {
                           sendOrSending = (
                               <Button
                                   onPress={onSendBtnClicked}
                                   title="Send"
                               />
                           )
                       } else {
                           sendOrSending = (
                               <Text style={Styles.welcome}>Sending</Text>
                           )
                       }
                       let errorMsg = null;
                       if (error == null) {
                           errorMsg = empty;
                       } else {
                           errorMsg = (
                               <Text style={Styles.welcome}>{error}</Text>
                           );
                       }
                       if (!input) {
                           sendMsg(msg, host, path, password, onSuccess, onFailure);
                       }

                       const ret = (
                           <ScrollView contentContainerStyle={Styles.container}>
                               <Text style={Styles.welcome}>{'Message to send through ssh:\n'}{msg.length > 100 ? msg.substring(0, 100) + '...' : msg}</Text>
                               {errorMsg}
                               <View style={{flexDirection:'row'}}>
                                   <TextInput placeholder='user@host' style={Styles.input} editable = {input}
                                              onChangeText={onHostGiven}
                                              value={host}
                                   />
                               </View>
                               <View style={{flexDirection:'row'}}>
                                   <TextInput placeholder='path' style={Styles.input} editable = {input}
                                              onChangeText={onPathGiven}
                                              value={path}
                                   />
                               </View>
                               <View style={{flexDirection:'row'}}>
                                   <TextInput placeholder='password' style={Styles.input} editable = {input} secureTextEntry = {true}
                                              onChangeText={onPasswordGiven}
                                              value={password}
                                   />
                               </View>
                               {sendOrSending}
                           </ScrollView>
                       );
                       return ret;
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
        onSuccess: () => dispatch(SCPViewRedux.Action.done(true, 'Success')),
        onFailure: error => dispatch(SCPViewRedux.Action.done(false, ''+error))
    })
)(_scpView);
export default SCPView;
