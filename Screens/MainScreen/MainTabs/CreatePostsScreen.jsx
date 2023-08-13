import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useState } from "react";

const CreatePostsScreen = ({ navigation }) => {
  const [postTitle, setPostTitle] = useState();
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
        <View style={styles.cardContainer}>
          <TouchableOpacity>
            <View style={styles.photoWrapper}>
              <View style={styles.iconPhotoWrapper}>
                <FontAwesome
                  name="camera"
                  size={18}
                  color="#BDBDBD"
                  style={styles.iconPhoto}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPhotoEdit}>
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
            <Text style={styles.textLocation}>Місцевість</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.btnSubmitText}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
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
  iconPhotoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 120,
    backgroundColor: "white",
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
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  btnSubmit: {
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  btnSubmitText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;
