import React, {useState, useEffect, useRef} from 'react';
import {
  YellowBox,
  SafeAreaView,
  Button,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
YellowBox.ignoreWarnings(['AsyncStorage']);

const storeData = async (key, data) => {
  try {
    return await AsyncStorage.setItem(key, data);
  } catch (error) {
    Alert.alert("Error - can't save to storage", error);
  }
};

const retrieveData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    Alert.alert("Error - can't retreive from storage", error);
  }
};

const App = () => {
  const pwdRef = useRef();
  const [passwordFromStorage, setPasswordFromStorage] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    retrieveData('@BSM_PASS').then(pass => {
      if (pass) {
        setPasswordFromStorage(pass);
      } else {
        setPasswordFromStorage('startowe');
      }
    });

    retrieveData('@BSM_NOTE').then(note => {
      if (note) {
        setNoteText(note);
      }
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 25,
        }}>
        {isLoggedIn && (
          <TextInput
            label="Note"
            value={noteText}
            multiline
            onChangeText={text => {
              setNoteText(text);
              storeData('@BSM_NOTE', text);
            }}
            style={{marginBottom: 30}}
            numberOfLines={10}
          />
        )}

        <TextInput
          ref={pwdRef}
          mode="outlined"
          label={isLoggedIn ? 'Change password' : 'Enter password'}
          value={passwordInput}
          onChangeText={setPasswordInput}
          style={{marginBottom: 10}}
          secureTextEntry
        />
        <Button
          title={isLoggedIn ? 'Change password' : 'Log in'}
          color="black"
          onPress={() => {
            if (!isLoggedIn && passwordInput !== passwordFromStorage) {
              Alert.alert('Incorrect password');
            } else if (!isLoggedIn && passwordInput === passwordFromStorage) {
              setIsLoggedIn(true);
              Alert.alert('Hello!');
              pwdRef.current.blur();
            } else if (isLoggedIn && passwordInput.length) {
              storeData('@BSM_PASS', passwordInput).then(() => {
                Alert.alert('Password has been changed');
                pwdRef.current.blur();
              });
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
