import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addPostThunk } from "../../../redux/posts/thunk";
import { getIsPending } from "../../../redux/posts/selectors";

const screenDimensions = Dimensions.get("screen");

const CreatePostsScreen = ({ navigation, route }) => {
  const [postTitle, setPostTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [textLocation, setTextLocation] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsPending);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsGeoLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        if (imageUri) {
          let location = await Location.getLastKnownPositionAsync({});
          location = (await Location.getCurrentPositionAsync({})) ?? location;
          if (location) {
            const { coords } = location;
            let geo = await Location.reverseGeocodeAsync(coords);
            setLocation(coords);
            setGeocode(geo);
            setIsGeoLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsGeoLoading(false);
      }
    })();
  }, [imageUri]);

  useEffect(() => {
    if (geocode) {
      setTextLocation(
        `${geocode[0]?.city ? geocode[0]?.city + "," : ""} ${
          geocode[0]?.country ?? ""
        }`
      );
    }
  }, [geocode]);

  useEffect(() => {
    if (route.params?.imageUri) {
      setImageUri(route.params.imageUri);
    }
  }, [route]);

  const reset = () => {
    setPostTitle("");
    setImageUri(null);
    setLocation(null);
    setGeocode(null);
    setTextLocation("");
  };

  const handleSubmit = async () => {
    // notes.push({
    //   id: nanoid(),
    //   title: postTitle,
    //   imageUrl: imageUri,
    //   geoPosition: textLocation,
    //   commentsCount: 0,
    //   likes: 0,
    //   location: location,
    // });
    try {
      const date = new Date().toISOString();
      await dispatch(
        addPostThunk({
          title: postTitle,
          imageUrl: imageUri,
          geoPosition: textLocation,
          location: location,
          date: date,
        })
      ).unwrap();
      reset();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView
        style={[
          styles.container,
          { marginTop: Platform.OS === "ios" ? 0 : 44 },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitile}>Створити публікацію</Text>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.cardContainer}>
            <View style={styles.photoWrapper}>
              {imageUri && (
                <Image
                  style={styles.image}
                  source={{ uri: imageUri }}
                  width={343}
                  height={240}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Camera", {
                    key: route.key,
                  });
                }}
              >
                <View
                  style={[
                    styles.iconPhotoWrapper,
                    {
                      backgroundColor: imageUri
                        ? "rgba(255, 255, 255, 0.30)"
                        : "#fff",
                    },
                  ]}
                >
                  <FontAwesome
                    name="camera"
                    size={18}
                    color={imageUri ? "#fff" : "#BDBDBD"}
                    style={[styles.iconPhoto]}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnPhotoEdit} onPress={pickImage}>
              <Text style={styles.btnPhotoEditText}>Завантажте фото</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <TextInput
                style={styles.titleInput}
                placeholder="Назва..."
                placeholderTextColor={"#BDBDBD"}
                value={postTitle}
                onChangeText={setPostTitle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLocation}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              {imageUri && isGeoLoading && (
                <ActivityIndicator
                  style={styles.geoLoader}
                  size="small"
                  color="#BDBDBD"
                />
              )}
              <TextInput
                style={styles.textLocation}
                placeholder="Місцевість"
                placeholderTextColor={"#BDBDBD"}
                onChangeText={setTextLocation}
                value={textLocation}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.btnWrapper,
                {
                  height:
                    Platform.OS === "ios"
                      ? screenDimensions.height - 535
                      : screenDimensions.height - 535 - 82,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.btnSubmit,
                  {
                    backgroundColor:
                      location && imageUri && postTitle?.length > 0
                        ? "#FF6C00"
                        : "#F6F6F6",
                  },
                ]}
                onPress={handleSubmit}
                disabled={!(location && imageUri && postTitle?.length > 0)}
              >
                <Text
                  style={[
                    styles.btnSubmitText,
                    {
                      color:
                        location && imageUri && postTitle?.length > 0
                          ? "#FFF"
                          : "#BDBDBD",
                    },
                  ]}
                >
                  Опублікувати
                </Text>
                {isLoading && (
                  <ActivityIndicator
                    style={styles.createPostLoader}
                    size="small"
                    color="#BDBDBD"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={reset}
                style={[
                  styles.btnTrash,
                  {
                    marginBottom: screenDimensions.height - 639 > 60 ? 34 : 5,
                  },
                ]}
              >
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  cardContainer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "tomato",
    // height: 456,
  },
  photoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  image: {
    flex: 1,
    position: "absolute",
    borderRadius: 8,
    // backgroundColor: "tomato",
  },
  iconPhotoWrapper: {
    // position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",

    height: 60,
    width: 60,
    borderRadius: 120,

    // borderColor: "tomato",
    // borderWidth: 2,
  },
  btnPhotoEdit: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 32,
  },
  btnPhotoEditText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  titleInput: {
    paddingVertical: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  btnLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 16,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  textLocation: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    // marginBottom: 20,
  },
  geoLoader: {
    position: "absolute",
    right: 10,
  },
  btnWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: 32,
  },

  btnSubmit: {
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 51,
    borderRadius: 100,
  },
  btnSubmitText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  createPostLoader: {
    position: "absolute",
    right: 10,
  },
  btnTrash: {
    width: 70,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 80,
  },
});

export default CreatePostsScreen;
