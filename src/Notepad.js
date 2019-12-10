import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import KeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import { TextInput } from 'react-native-paper';

export const NotepadScreen = ({ navigation }) => {
  const [noteText, setNoteText] = useState('');
  const [secretText, setSecretText] = useState('');

  useEffect(() => {
    KeyStore.get('secret').then(
      secret => {
        KeyStore.get('note').then(
          note => {
            setSecretText(String(secret));
            if (note) {
              setNoteText(
                CryptoJS.AES.decrypt(note, String(secret)).toString(
                  CryptoJS.enc.Utf8,
                ),
              );
            }
          },
          err => {
            setSecretText(String(secret));
            console.log(err, 'no note exists');
          },
        );
      },
      err => {
        console.log('no secret set', err);
        navigation.navigate('Initial');
      },
    );
  }, [navigation]);

  return (
    <>
      <TextInput
        label="Note"
        value={noteText}
        multiline
        onChangeText={text => {
          setNoteText(text);

          const ciphertext = CryptoJS.AES.encrypt(text, secretText);
          KeyStore.set(
            'note',
            String(ciphertext),

            { accessible: ACCESSIBLE.WHEN_UNLOCKED },
          ).then(res => console.log(res));
        }}
        numberOfLines={10}
      />
    </>
  );
};
