import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
// import { useEffect } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged } from "firebase/auth";

// import LoginScreen from "./src/Screens/Auth/LoginScreen/LoginScreen";
// import RegistrationScreen from "./src/Screens/Auth/RegistrationScreen/RegistrationScreen";
import { store } from "./src/redux/store";
import { Routing } from "./src/Routing";
// import { getIsAuth } from "./src/redux/auth/selectors";
// import Main from "./src/Screens/MainScreen/Main";
// import CameraScreen from "./src/Screens/Camera/CameraScreen";
// import { auth } from "./src/firebase/config";
// import { setIsAuth, updateUserProfile } from "./src/redux/auth/authSlice";

const fontsForLoading = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
};

export default function App() {
  const [fontIsLoaded] = useFonts(fontsForLoading);
  if (!fontIsLoaded) {
    return;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routing />
      </NavigationContainer>
    </Provider>
  );
}
