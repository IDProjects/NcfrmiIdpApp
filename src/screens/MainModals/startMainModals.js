import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const startPrinterModals = () => {
    Navigation.showLightBox({
      screen: 'ncfrmi-app.TestScreen', // unique ID registered with Navigation.registerScreen
      title: 'Modal', // title of the screen as appears in the nav bar (optional)
      style: {
        backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: '#ff000080', // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
};
