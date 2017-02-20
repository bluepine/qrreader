import React, {Component, PropTypes} from 'react';
import { requireNativeComponent, View } from 'react-native';

type Event = Object;
class QRView extends Component {
    static propTypes = {
        ...View.propTypes, // include the default view properties
        onQrCodeDecoded: PropTypes.func.isRequired
    }

    _onChange = (event: Event) => {
        this.props.onQrCodeDecoded(event.nativeEvent.message);
    }
    render() {
        return <_QRView {...this.props} onChange={this._onChange} />;
    }
}


const _QRView = requireNativeComponent('QRView', QRView, {nativeOnly: {onChange: true}});
export default QRView;
