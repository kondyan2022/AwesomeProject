import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="PostsTab"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.button}>
              <Feather name="grid" size={24} color="#212121cd" />
            </TouchableOpacity>
          ),
        }}
        component={PostsScreen}
      />

      <Tab.Screen
        name="CreateTab"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.btnNew}>
              <Feather name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
        component={CreatePostsScreen}
      />

      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.button}>
              <Feather name="user" size={24} color="#212121cd" />
            </TouchableOpacity>
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNew: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
    backgroundColor: "#FF6C00",
    marginHorizontal: 31,
  },
  tabBarStyle: {
    display: "flex",
    borderTopWidth: 1,
    borderTopColorColor: "#0000004c",
    height: 83,
    paddingTop: 9,
    alignItems: "center",
    justifyContent: "center",
    columnGap: 31,
  },
});
