import { connect } from 'react-redux';
const SCPView = {};
const _scpView = (
    {msg}) => {
        return <Text style={styles.welcome}>SCP View is in unknown state</Text>;
    };
SCPView = connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(_scpView);
_scpView.propTypes = {
    msg: PropTypes.string.isRequired
};
export default SCPView;
