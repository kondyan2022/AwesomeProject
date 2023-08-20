import "react-native-gesture-handler";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";

import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { getIsAuth } from "./redux/selectors";

import Main from "./Screens/MainScreen/Main";
import CameraScreen from "./Screens/Camera/CameraScreen";

const fontsForLoading = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
};
const AuthStack = createStackNavigator();

const Routing = () => {
  const isAuth = useSelector(getIsAuth);
  return isAuth ? (
    <Main />
  ) : (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={RegistrationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Camera"
        component={CameraScreen}
      />
    </AuthStack.Navigator>
  );
};

export default function App() {
  const [fontIsLoaded] = useFonts(fontsForLoading);
  // const isAuth = useSelector(getIsAuth);

  // const isAuth = useSelector(getIsAuth);

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
