import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

const MapScreen = ({ navigation, route }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={[styles.container, { marginTop: Platform.OS === "ios" ? 0 : 44 }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitile}>Мапа</Text>
        <TouchableOpacity style={styles.btnLogOut} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.mapStyle}
        region={{
          ...route.params.location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={10}
        // onMapReady={() => console.log("Map is ready")}
      >
        <Marker
          title="I am here"
          coordinate={{ ...route.params.location }}
          description="Hello"
        />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#0000004c",
  },
  headerTitile: {
    paddingVertical: 11,
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    lineHeight: 22,

    color: "#212121",
  },

  btnLogOut: {
    position: "absolute",
    left: 16,
    bottom: 10,
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
