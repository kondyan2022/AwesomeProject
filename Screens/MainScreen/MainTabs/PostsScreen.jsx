import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { PublicationCard } from "../../../Components/PublicationCard";
import { notes, user } from "../../../testdata";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../redux/authSlice";

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Platform.OS === "ios" ? 0 : 30 }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitile}>Публікації</Text>
        <TouchableOpacity
          style={styles.btnLogOut}
          onPress={() => {
            dispatch(setIsAuth(false));
          }}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <ScrollView style={styles.listView}>
          <View style={styles.userCard}>
            <Image
              source={{ uri: user.imageUrl }}
              style={[styles.image, { width: 60, height: 60 }]}
            />
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
          {notes.map(
            ({ id, title, imageUrl, geoPosition, commentsCount, location }) => (
              <PublicationCard
                key={id}
                id={id}
                title={title}
                imageUrl={imageUrl}
                geoPosition={geoPosition}
                commentsCount={commentsCount}
                location={location}
                messageIcon={{
                  color: "#BDBDBD",
                  backgroundColor: "transparent",
                }}
                navigation={navigation}
              />
            )
          )}
        </ScrollView>
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
