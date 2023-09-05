import {
  Button,
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
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";

import { getPosts } from "../../redux/posts/selectors";
import { auth } from "../../firebase/config";
import { addCommentToPostThunk } from "../../redux/posts/thunk";
import { useKeyboardHeight } from "../../utils/hookKeyboardHeight";
import { useEffect } from "react";
import { Platform } from "react-native";

const CommentsScreen = ({ navigation, route }) => {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(255);
  const [isInputCommentFocused, setIsInputCommentFocused] = useState(false);

  const currentPost = useMemo(
    () => posts.filter(({ id }) => id === route.params.id)[0],
    [posts, route.params.id]
  );

  const getCommentListLayout = useMemo(
    () => (
      <FlatList
        style={{ flex: 1 }}
        onLayout={(element) => {
          listRef.current = element.target;
        }}
        ListHeaderComponent={
          <View>
            <Image
              source={{
                uri: currentPost.imageUri,
              }}
              style={[styles.image, { width: 343, height: 240 }]}
            />
          </View>
        }
        // ListFooterComponent={<View></View>}
        // ListFooterComponentStyle={{ height: 5 }}
        data={currentPost.comments}
        renderItem={({ item: elem, index }) => {
          // console.log(elem);
          return (
            <View
              key={index}
              style={[
                styles.card,
                { flexDirection: index % 2 === 0 ? "row" : "row-reverse" },
              ]}
            >
              {elem.userImageUrl && (
                <Image
                  source={{ uri: elem.userImageUrl }}
                  style={[styles.userImage, { width: 28, height: 28 }]}
                />
              )}

              <View
                style={[styles.textWrapper, { width: 299, height: "auto" }]}
              >
                <Text style={styles.text}>{elem.comment}</Text>
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
          );
        }}
      />
    ),
    [currentPost]
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        const hight = Math.round(e.endCoordinates.height);
        listRef.current.scrollToEnd();
        if (hight && keyboardHeight !== hight) {
          setKeyboardHeight(hight);
        }
      }
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current.blur();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollToEnd();
  }, [currentPost]);

  const handleSubmit = () => {
    dispatch(
      addCommentToPostThunk({
        postId: route.params.id,
        uid: auth.currentUser.uid,
        userImageUrl: auth.currentUser.photoURL,
        comment: comment,
        date: new Date().toISOString(),
      })
    )
      .unwrap()
      .then(() => listRef.current?.scrollToEnd());

    setComment("");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "ios" ? 0 : 44,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            position: "relative",
            // marginTop:
            //   Platform.OS !== "ios" && keyboardHeight > 0
            //     ? keyboardHeight - 14
            //     : 0,
          },
        ]}
      >
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "undefined"}
        style={
          Platform.OS === "ios"
            ? {
                flex: 1,
              }
            : {
                height:
                  Dimensions.get("screen").height -
                  144 -
                  (isInputCommentFocused ? keyboardHeight : 0),
              }
        }
      >
        {getCommentListLayout}
        <View style={styles.footer}>
          <View style={styles.footerWrapper}>
            <TextInput
              onLayout={(element) => {
                inputRef.current = element.target;
              }}
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor={"#BDBDBD"}
              value={comment}
              onChangeText={setComment}
              onFocus={() => {
                setIsInputCommentFocused(true);
                listRef.current?.scrollToEnd();
              }}
              onBlur={() => setIsInputCommentFocused(false)}
            />
            <TouchableOpacity
              style={styles.btnSubmit}
              disabled={!comment}
              onPress={handleSubmit}
            >
              <Ionicons
                name="arrow-up-circle"
                size={48}
                color={comment ? "#FF6C00" : "#F6F6F6"}
              />
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
    backgroundColor: "#fff",
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
