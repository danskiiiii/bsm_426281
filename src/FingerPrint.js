import React, { Component } from 'react';

import { Alert, Image, Text, View } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from './Shake';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
  },
  heading: {
    textAlign: 'center',
    color: '#00a4de',
    fontSize: 22,
    marginBottom: 40,
  },
  description: error => ({
    textAlign: 'center',
    color: error ? '#ea3d13' : '#a5a5a5',
    fontSize: 18,
  }),
};

class Fingerprint extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  componentDidMount() {
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        console.log({ biometryType });

        FingerprintScanner.authenticate({
          onAttempt: this.handleAuthenticationAttempted,
        })
          .then(() => {
            Alert.alert('Welcome');
            this.props.navigation.navigate('Notepad');
          })
          .catch(error => {
            console.log(error);
            this.setState({ errorMessage: error.message });
            this.description.shake();
            Alert.alert('Failed to authenticate');
          });
      })
      .catch(error => {
        console.log({ error });
        this.setState({ errorMessage: error.message });
        Alert.alert('No scanner on device');
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = error => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
    Alert.alert('Failed to authenticate');
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./finger_print.png')} />

        <Text style={styles.heading}>BSM{'\n'}Fingerprint</Text>
        <ShakingText
          ref={instance => {
            this.description = instance;
          }}
          style={styles.description(!!errorMessage)}>
          {errorMessage ||
            'Scan your fingerprint on the\ndevice scanner to continue'}
        </ShakingText>
      </View>
    );
  }
}

export default Fingerprint;
