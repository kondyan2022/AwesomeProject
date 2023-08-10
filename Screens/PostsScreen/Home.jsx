import { TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      }}
    >
      <MainTab.Screen
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.button}>
              <Feather name="grid" size={24} color="#212121cd" />
            </TouchableOpacity>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.btnNew}>
              <Feather name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.button}>
              <Feather name="user" size={24} color="#212121cd" />
            </TouchableOpacity>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};

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

export default Home;

//   tabBar={(props) => {
//     console.log(props);
//     return (
//       <View
//         style={{
//           backgroundColor: "#00ff00",
//           flexDirection: "row",
//           justifyContent: "center",
//           paddingBottom: 34,
//         }}
//       >
//         <TouchableOpacity {...props} style={styles.button}>
//           <Feather name="plus" size={24} color="#ffffff" />
//         </TouchableOpacity>
//       </View>
//     );
//   }}
