import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import HomeScreen from "./src/screens/Home/Home";
import ProfileScreen from "./src/screens/Profile/Profile";
import ProfileEditScreen from "./src/screens/ProfileEdit/ProfileEdit";
import FindMechanicsScreen from "./src/screens/FindMechanics/FindMechanics";
import MechanicDetailScreen from "./src/screens/MechanicDetail/MechanicDetail";
import AddMechanicScreen from "./src/screens/AddMechanic/AddMechanic";
import MyVehiclesScreen from "./src/screens/MyVehicles/MyVehicles";
import AddVehicleScreen from "./src/screens/AddVehicle/AddVehicle";
import VehicleDetailScreen from "./src/screens/VehicleDetail/VehicleDetail";
import VehicleEditScreen from "./src/screens/VehicleEdit/VehicleEdit";
import VehicleHistoryEditScreen from "./src/screens/VehicleHistoryEdit/VehicleHistoryEdit";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  "fixit-app.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.HomeScreen",
  () => HomeScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.AddMechanicScreen",
  () => AddMechanicScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.FindMechanicsScreen",
  () => FindMechanicsScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.MyVehiclesScreen",
  () => MyVehiclesScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.VehicleHistoryEditScreen",
  () => VehicleHistoryEditScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.MechanicDetailScreen",
  () => MechanicDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.VehicleDetailScreen",
  () => VehicleDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.VehicleEditScreen",
  () => VehicleEditScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.AddVehicleScreen",
  () => AddVehicleScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.ProfileScreen",
  () => ProfileScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.ProfileEditScreen",
  () => ProfileEditScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "fixit-app.SideDrawer",
  () => SideDrawer,
  store,
  Provider
);

// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "fixit-app.AuthScreen",
    title: "Login"
  }
});
