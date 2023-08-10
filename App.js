import "react-native-gesture-handler";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import Home from "./Screens/PostsScreen/Home";

const fontsForLoading = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

const useRoute = (isAuth) => {};

export default function App() {
  const [fontIsLoaded] = useFonts(fontsForLoading);
  if (!fontIsLoaded) {
    return;
  }
  return (
    <NavigationContainer>
      <Home />
      {/* <Auth /> */}
      {/* <AuthStack.Navigator initialRouteName="Login">
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
          name="Home"
          component={PostsScreen}
        />
      </AuthStack.Navigator> */}
    </NavigationContainer>
  );
}
