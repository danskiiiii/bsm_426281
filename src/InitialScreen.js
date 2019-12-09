import React from 'react';
import CryptoJS from 'crypto-js';
import KeyStore from 'react-native-secure-key-store';

import { ActivityIndicator } from 'react-native';

export const InitialScreen = ({ navigation }) => {
  KeyStore.get('secret').then(
    res => {
      console.log(res);
      navigation.navigate('Login');
    },
    err => {
      console.log('no secret set - initial app run', err);

      KeyStore.set(
        'secret',
        String(
          CryptoJS.lib.WordArray.random(Math.floor(Math.random() * 25 + 15)),
        ),
        null,
      ).then(res => {
        console.log(res);
        navigation.navigate('ChangePassword', { initial: true });
      });
    },
  );

  return <ActivityIndicator size="large" />;
};
