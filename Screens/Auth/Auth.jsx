import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen/LoginScreen";
import PostsScreen from "./Screens/Home/PostsScreen";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const Auth = () => {
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
      name="Home"
      component={PostsScreen}
    />
  </AuthStack.Navigator>;
};

export default Auth;
