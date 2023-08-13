import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
import MainTabs from "./MainTabs/MainTabs";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MainTabs"
        component={MainTabs}
      />

      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Main;
