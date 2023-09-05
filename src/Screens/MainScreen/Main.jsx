import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { collection, onSnapshot } from "firebase/firestore";
import { Platform } from "react-native";

import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
import MainTabs from "./MainTabs/MainTabs";
import CameraScreen from "../Camera/CameraScreen";
import ImagePickerExample from "../ImageGallery/ImageGallery";
import { fetchAllThunk } from "../../redux/posts/thunk";
import { db } from "../../firebase/config";
import { addPost, updatePost } from "../../redux/posts/postsSlice";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addPost(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(updatePost(change.doc.data()));
        }
      });
    });
    return () => unsubscribe();
  }, [dispatch]);

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
