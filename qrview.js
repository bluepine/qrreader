import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'QRView',
  propTypes: {    
    ...View.propTypes // include the default view properties
  }
};

module.exports = requireNativeComponent('QRView', iface);
