import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import HomeScreen from "./src/screens/Home/Home";
import RegisterIdpScreen from "./src/screens/RegisterIdp/RegisterIdp";
import TestScreen from "./src/screens/Test/Test";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  "ncfrmi-app.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "ncfrmi-app.HomeScreen",
  () => HomeScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "ncfrmi-app.RegisterIdpScreen",
  () => RegisterIdpScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "ncfrmi-app.SideDrawer",
  () => SideDrawer,
  store,
  Provider
);

Navigation.registerComponent(
  "ncfrmi-app.TestScreen",
  () => TestScreen,
  store,
  Provider
);

// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "ncfrmi-app.AuthScreen",
    title: "Login"
  }
});
