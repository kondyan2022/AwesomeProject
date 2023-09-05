import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
// import PostsScreen from "./Screens/Home/PostsScreen";
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
  </AuthStack.Navigator>;
};

export default Auth;
