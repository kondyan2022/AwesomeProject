import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { PublicationCard } from "../../../Components/PublicationCard";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../../redux/auth/authSlice";
import { signOut } from "firebase/auth";
import { signOutUserThunk } from "../../../redux/auth/thunk";
import { getUserProfile } from "../../../redux/auth/selectors";
import { getPosts } from "../../../redux/posts/selectors";
import { clearPosts } from "../../../redux/posts/postsSlice";

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  const {
    email: userEmail,
    displayName: userName,
    photoURL: userImageUri,
  } = useSelector(getUserProfile);

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Platform.OS === "ios" ? 0 : 30 }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitile}>Публікації</Text>
        <TouchableOpacity
          style={styles.btnLogOut}
          onPress={() => {
            dispatch(clearPosts());
            dispatch(signOutUserThunk());
          }}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.userCard}>
              {userImageUri && <Image
                source={{ uri: userImageUri }}
                style={[styles.image, { width: 60, height: 60 }]}
              />}
              <View>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
              </View>
            </View>
          }
          data={posts}
          renderItem={({
            item: {
              id,
              title,
              imageUri,
              geoPosition,
              comments,
              location,
              likes,
              uid,
            },
          }) => (
            <PublicationCard
              id={id}
              title={title}
              imageUrl={imageUri}
              geoPosition={geoPosition}
              commentsCount={comments?.length}
              likesCount={likes?.length}
              location={location}
              likes={likes}
              uid={uid}
              messageIcon={{
                color: "#BDBDBD",
                backgroundColor: "transparent",
              }}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    // flex: 1,
    width: "100%",
    height: 44,
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
    right: 16,
    bottom: 10,
  },
  main: {
    flex: 1,
    // height: 200,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  listView: {
    // height: 200,
  },
  image: { borderRadius: 16 },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 32,
    gap: 8,
    alignSelf: "flex-start",
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    lineHeight: 13,
    color: "#212121cb",
  },
});

export default PostsScreen;
