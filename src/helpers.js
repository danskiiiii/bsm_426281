// import { AsyncStorage, Alert } from 'react-native';

export const validatePassword = password => {
  const regex = /^.{9,100}$/;

  return regex.test(password);
};

// export const storeData = async (key, data) => {
//   try {
//     return await AsyncStorage.setItem(key, data);
//   } catch (error) {
//     Alert.alert("Error - can't save to storage", error);
//   }
// };

// export const retrieveData = async key => {
//   try {
//     return await AsyncStorage.getItem(key);
//   } catch (error) {
//     Alert.alert("Error - can't retreive from storage", error);
//   }
// };
