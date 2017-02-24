import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import SCPViewRedux from './scpview.redux.js'
import {Styles} from './res.js';
const SCPView = {};
const _scpView = (
    {msg}) => {
        return <Text style={Styles.welcome}>SCP View is in unknown state</Text>;
    };
_scpView.propTypes = {
    stateMap: React.PropTypes.objectPropTypes
};
SCPView = connect(
    (state) => {
        console.log(state);
        return {};
    },
    (dispatch) => ({
    })
)(_scpView);
export default SCPView;
