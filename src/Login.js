import React, { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { Button, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import KeyStore from 'react-native-secure-key-store';

export const LoginScreen = ({ navigation }) => {
  const pwdRef = useRef();
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = () => {
    KeyStore.get('salt').then(salt => {
      const key512Bits1000Iterations = CryptoJS.PBKDF2(passwordInput, salt, {
        keySize: 512 / 32,
        iterations: 1000,
      });

      KeyStore.get('hash').then(hash => {
        if (String(key512Bits1000Iterations) === hash) {
          navigation.navigate('Notepad');
        } else {
          Alert.alert('Try again');
        }
      });
    });
  };

  return (
    <>
      <TextInput
        ref={pwdRef}
        mode="outlined"
        label={'Enter password'}
        value={passwordInput}
        onChangeText={setPasswordInput}
        onBlur={() => {
          pwdRef.current.blur();
        }}
        style={{ marginBottom: 20 }}
        secureTextEntry
      />

      <Button title="log in" color="blueviolet" onPress={handleLogin} />
    </>
  );
};
