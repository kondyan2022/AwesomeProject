import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { comments, notes, user } from "../../testdata";
import { useRoute } from "@react-navigation/native";
import { nanoid } from "@reduxjs/toolkit";
import { useMemo, useRef, useState } from "react";

const CommentsScreen = ({ navigation }) => {
  const [commentsList, setCommentsList] = useState(comments);
  const [comment, setComment] = useState("");
  const {
    params: { id: searchId },
  } = useRoute();
  const listRef = useRef(null);

  const getCommentListLayout = useMemo(
    () =>
      commentsList.map((elem, index) => (
        <View
          key={elem.id}
          style={[
            styles.card,
            { flexDirection: index % 2 === 0 ? "row" : "row-reverse" },
          ]}
        >
          <Image
            source={{ uri: elem.userImageUrl }}
            style={[styles.userImage, { width: 28, height: 28 }]}
          />

          <View style={[styles.textWrapper, { width: 299, height: "auto" }]}>
            <Text style={styles.text}>{elem.text}</Text>
            <Text
              style={[
                styles.date,
                {
                  alignSelf: index % 2 === 0 ? "flex-end" : "flex-start",
                },
              ]}
            >
              {new Date(elem.date).toLocaleString("uk-UA", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      )),
    [commentsList]
  );

  const handleSubmit = () => {
    setCommentsList((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        userImageUrl: user.imageUrl,
        text: comment,
        date: new Date().toISOString(),
      },
    ]);

    listRef.current?.scrollToEnd();
    setComment("");
  };

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Platform.OS === "ios" ? 0 : 44 }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitile}>Коментарі</Text>
        <TouchableOpacity
          style={styles.btnLogOut}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <ScrollView
        onLayout={(element) => {
          listRef.current = element.target;
        }}
        style={styles.list}
      >
        <View>
          <Image
            source={{
              uri: notes.filter(({ id }) => id === searchId)[0].imageUrl,
            }}
            style={[styles.image, { width: 343, height: 240 }]}
          />
        </View>
        {getCommentListLayout}
      </ScrollView>
      <KeyboardAvoidingView
        // behavior={"padding"}
        // enabled={Platform.OS === "ios"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.footer}>
          <View style={styles.footerWrapper}>
            <TextInput
              // multiline={true}
              // textAlignVertical="top"
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor={"#BDBDBD"}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
              <Ionicons name="arrow-up-circle" size={48} color="#FF6C00" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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

  image: { borderRadius: 8, marginTop: 32, marginBottom: 32 },
  list: {
    flex: 1,
  },
  card: { gap: 16, marginBottom: 24 },
  userImage: { borderRadius: 56 },
  textWrapper: {
    gap: 8,
    padding: 16,

    backgroundColor: "#00000008",
  },
  text: {
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    lineHeight: 18,
    color: "#212121",
  },
  date: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    lineHeight: 12,
    color: "#BDBDBD",
  },
  footer: {
    height: 68,
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
    backgroundColor: "#",
  },
  footerWrapper: {},
  commentInput: {
    width: 343,
    height: 50,
    padding: 16,
    paddingRight: 54,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    fontStyle: "normal",
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  btnSubmit: {
    position: "absolute",
    right: 0,
  },
});

export default CommentsScreen;
