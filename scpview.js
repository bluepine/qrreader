import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import SCPViewRedux from './scpview.redux.js'
import {Styles} from './res.js';
const _scpView = ({msg}) => {
    return <Text style={Styles.welcome}>{'Message to send:\n'}{msg}</Text>
};
_scpView.propTypes = {
    msg: PropTypes.string.isRequired
};
SCPView = connect(
    (state) => ({msg: state[SCPViewRedux.Name].msg}),
    (dispatch) => ({})
)(_scpView);
export default SCPView;
