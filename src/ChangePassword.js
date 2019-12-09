import React, { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { Button, Alert, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { validatePassword } from './helpers';
import KeyStore from 'react-native-secure-key-store';

export const ChangePasswordScreen = ({ navigation }) => {
  const pwdRef = useRef();
  const [passwordInput, setPasswordInput] = useState('');
  const initial = navigation.getParam('initial');

  const setUserPassword = () => {
    if (validatePassword(passwordInput)) {
      const salt = String(
        CryptoJS.lib.WordArray.random(Math.floor(Math.random() * 25 + 15)),
      );

      const key512Bits1000Iterations = CryptoJS.PBKDF2(passwordInput, salt, {
        keySize: 512 / 32,
        iterations: 1000,
      });

      KeyStore.set('hash', String(key512Bits1000Iterations), null).then(res =>
        console.log(res),
      );
      KeyStore.set('salt', salt, null).then(res => console.log(res));

      navigation.navigate('Notepad');
    } else {
      Alert.alert('Weak password');
    }
  };

  return (
    <>
      <TextInput
        ref={pwdRef}
        mode="outlined"
        label={initial ? 'Set password' : 'Change password'}
        value={passwordInput}
        onChangeText={setPasswordInput}
        onBlur={() => {
          // pwdRef.current.blur();
        }}
        style={{ marginBottom: 20 }}
        secureTextEntry
      />

      <Button
        title={initial ? 'Set password' : 'Change password'}
        color="blueviolet"
        onPress={setUserPassword}
      />

      {!initial && (
        <>
          <View style={{ height: 20 }} />
          <Button
            title={'Back'}
            color="black"
            onPress={() => navigation.navigate('Notepad')}
          />
        </>
      )}
    </>
  );
};
