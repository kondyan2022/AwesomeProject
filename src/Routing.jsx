import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { getIsAuth } from "./redux/auth/selectors";
import { setIsAuth, updateUserProfile } from "./redux/auth/authSlice";
import LoginScreen from "./Screens/Auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import CameraScreen from "./Screens/Camera/CameraScreen";
import Main from "./Screens/MainScreen/Main";
import { auth } from "./firebase/config";

const AuthStack = createStackNavigator();

export const Routing = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        const userData = Object.fromEntries(
          Object.entries({ displayName, email, photoURL }).filter(
            ([key, value]) => value
          )
        );
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
