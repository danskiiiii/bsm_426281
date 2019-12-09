import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { InitialScreen } from './InitialScreen';
import { LoginScreen } from './Login';
import { NotepadScreen } from './Notepad';
import { ChangePasswordScreen } from './ChangePassword';

export default createAppContainer(
  createSwitchNavigator(
    {
      Initial: InitialScreen,
      Login: LoginScreen,
      Notepad: NotepadScreen,
      ChangePassword: ChangePasswordScreen,
    },
    {
      initialRouteName: 'Initial',
    },
  ),
);
