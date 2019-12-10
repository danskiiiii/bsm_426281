import React from 'react';
import CryptoJS from 'crypto-js';
import KeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

import { ActivityIndicator } from 'react-native';

export const InitialScreen = ({ navigation }) => {
  KeyStore.get('secret').then(
    res => {
      console.log(res);
      navigation.navigate('Finger');
    },
    err => {
      console.log('no secret set - initial app run', err);

      KeyStore.set(
        'secret',
        String(
          CryptoJS.lib.WordArray.random(Math.floor(Math.random() * 25 + 15)),
        ),
        { accessible: ACCESSIBLE.WHEN_UNLOCKED },
      ).then(res => {
        console.log(res);
        navigation.navigate('Finger');
      });
    },
  );

  return <ActivityIndicator size="large" />;
};
