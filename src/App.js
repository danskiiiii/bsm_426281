import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Navigator from './Navigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 25,
        }}>
        <Navigator />
      </SafeAreaView>
    </>
  );
};

export default App;
