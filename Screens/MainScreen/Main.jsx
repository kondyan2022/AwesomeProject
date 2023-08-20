import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
import MainTabs from "./MainTabs/MainTabs";
import CameraScreen from "../Camera/CameraScreen";
import ImagePickerExample from "../ImageGallery/ImageGallery";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={MainTabs}
      />

      <Tab.Screen
        name="Map"
        options={{ headerShown: false }}
        component={MapScreen}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Gallery"
        component={ImagePickerExample}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Main;
