import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

export default function CameraScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(
    route.params?.avatar ? CameraType.front : CameraType.back
  );
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasPermission(status === "granted");
      })();
    } catch (error) {
      console.log("useEffect camera requestCameraPermissionsAsync() ", error);
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const changeFlash = () => {
    switch (flashMode) {
      case FlashMode.off:
        setFlashMode(FlashMode.on);
        break;
      case FlashMode.on:
        setFlashMode(FlashMode.auto);
        break;
      default:
        setFlashMode(FlashMode.off);
        break;
    }
    // console.log("after", flashMode);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleUpload = () => {
    navigation.dispatch({
      ...CommonActions.setParams({ imageUri: imageUri }),
      source: route.params.key,
    });
    navigation.goBack();
  };

  const handleSnap = async () => {
    try {
      if (cameraRef) {
        const actions = [];
        let imageData = await cameraRef.takePictureAsync();

        if (type === CameraType.front) {
          actions.push(
            { flip: FlipType.Horizontal },
            { resize: { width: imageData.width * 0.7 } }
          );
        }
        if (route.params?.avatar) {
          actions.push({ resize: { width: 300 } });
        }

        actions.push({ resize: { width: imageData.width * 0.7 } });

        imageData = await manipulateAsync(imageData.uri, actions, {
          compress: 0.7,
          format: SaveFormat.JPEG,
        });
        const imageLibrary = await MediaLibrary.createAssetAsync(imageData.uri);
        setImageUri(imageLibrary.uri);
      }
    } catch (error) {
      console.log("Camera handleUpload:", error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { marginTop: Platform.OS === "ios" ? 0 : 44 }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitile}>Камера</Text>
        <TouchableOpacity style={styles.btnLogOut} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      <Camera
        style={styles.camera}
        type={type}
        ref={setCameraRef}
        flashMode={flashMode}
      >
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <Feather name="refresh-ccw" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSnap}>
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.flipContainer} onPress={changeFlash}>
            <MaterialCommunityIcons
              name={
                flashMode === FlashMode.off
                  ? "flash-off"
                  : flashMode === FlashMode.on
                  ? "flash"
                  : "flash-auto"
              }
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {imageUri && (
            <Image
              style={styles.preview}
              source={{ uri: imageUri }}
              width={114}
              height={80}
            />
          )}
          {imageUri && (
            <TouchableOpacity style={styles.upload} onPress={handleUpload}>
              <Feather name="upload" size={36} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  camera: {
    flex: 1,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  flipContainer: {
    padding: 8,
    borderRadius: 80,
    marginBottom: 16,
    alignSelf: "flex-end",
    backgroundColor: "#ffffffb0",
  },

  button: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  preview: {
    position: "absolute",
    left: 10,
    top: 10,
    borderRadius: 3,
  },

  upload: {
    position: "absolute",
    right: 30,
    padding: 8,
    borderRadius: 88,
    bottom: 100,
    backgroundColor: "#00ff00a6",
  },
});
