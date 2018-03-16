import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import styles from './Application.container.styles';
import FingerprintPopup from './FingerprintPopup.component.android';

class TestScreen extends Component {

    constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      popupShowed: false
    };
  }

  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true });
  };

  handleFingerprintDismissed = () => {
    this.setState({ popupShowed: false });
  };

  componentDidMount() {
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    const { errorMessage, popupShowed } = this.state;

    return (
      <View style={[styles.container, { width: Dimensions.get("window").width * 0.9, height: Dimensions.get("window").height * 0.6 } ]}>

        <Text style={styles.heading}>
          IDPs Fingerprint Scanner
        </Text>
        <Text style={styles.subheading}>
          https://github.com/hieuvp/react-native-fingerprint-scanner
        </Text>

        <TouchableOpacity
          style={styles.fingerprint}
          onPress={this.handleFingerprintShowed}
          disabled={!!errorMessage}
        >
          <Image source={require('../../assets/finger_print.png')} />
        </TouchableOpacity>

        {errorMessage && (
          <Text style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}

        {popupShowed && (
          <FingerprintPopup
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
          />
        )}

      </View>
    );
  }

}

export default TestScreen;
