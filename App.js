import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "./Screens/Auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import { store } from "./redux/store";
import { getIsAuth } from "./redux/auth/selectors";
import Main from "./Screens/MainScreen/Main";
import CameraScreen from "./Screens/Camera/CameraScreen";
import { auth } from "./firebase/config";
import { setIsAuth, updateUserProfile } from "./redux/auth/authSlice";

const fontsForLoading = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
};
const AuthStack = createStackNavigator();

const Routing = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(
      //   user ? " onAuthStateChanged Login " : "onAuthStateChanged logout"
      // );

      if (user) {
        // console.log("onAuthStateChanged", user);
        const { displayName, email, photoURL } = user;
        const userData = Object.fromEntries(
          Object.entries({ displayName, email, photoURL }).filter(
            ([key, value]) => value
          )
        );

        // console.log("onAuthStateChanged user displayName", userData);
        dispatch(updateUserProfile(userData));
        dispatch(setIsAuth(true));
      } else {
        dispatch(setIsAuth(false));
        dispatch(
          updateUserProfile({
            displayName: null,
            photoURL: null,
            email: null,
          })
        );
      }
    });
    return () => unsubscribe();
  }, []);

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
