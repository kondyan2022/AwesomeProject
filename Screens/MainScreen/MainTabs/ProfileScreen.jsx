import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";
import BackgroundImage from "../../../assets/img/bgimage.jpg";
import { notes, user } from "../../../testdata";
import { PublicationCard } from "../../../Components/PublicationCard";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../redux/authSlice";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={[styles.form]}>
          <View style={styles.userImage}>
            <Image
              source={{ uri: user.imageUrl }}
              style={[styles.userPhoto, { width: 120, height: 120 }]}
            />

            <TouchableOpacity style={styles.userImageButton}>
              <Feather
                name="plus"
                size={22}
                color="#BDBDBD"
                backgroundColor="#FFF"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => {
              dispatch(setIsAuth(false));
            }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name}</Text>
          <ScrollView style={styles.listView}>
            {notes.map(
              ({ id, title, imageUrl, geoPosition, commentsCount, likes }) => (
                <PublicationCard
                  key={id}
                  id={id}
                  title={title}
                  imageUrl={imageUrl}
                  geoPosition={geoPosition.split(" ").slice(-1)}
                  commentsCount={commentsCount}
                  likesCount={likes}
                  messageIcon={{
                    color: "#FF6C00",
                  }}
                  thumbsIcon={{ color: "#FF6C00" }}
                  navigation={navigation}
                />
              )
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// <View style={styles.container}>
// <ImageBackground source={BackgroundImage} style={styles.image}>
// <Text>Ghbddfsdlkf </Text>
// //    <View style={[styles.main]}>
// //       <View style={[styles.form]}>
// //         <View style={styles.userImage}>
// //           <TouchableOpacity style={styles.userImageButton}>
// //             <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
// //           </TouchableOpacity>
// //         </View>
// //         <TouchableOpacity
//           style={styles.btnLogOut}
//           onPress={() => {
//             console.log("Перехід до Логін");
//           }}
//         >
//           <Feather name="log-out" size={24} color="#BDBDBD" />
//         </TouchableOpacity>
//         <Text>{user.name}</Text>
//         <ScrollView style={styles.listView}>
//           {notes.map(
//             ({ id, title, imageUrl, geoPosition, commentsCount }) => (
//               <PublicationCard
//                 key={id}
//                 title={title}
//                 imageUrl={imageUrl}
//                 geoPosition={geoPosition.split(" ").slice(-1)}
//                 commentsCount={commentsCount}
//               />
//             )
//           )}
//         </ScrollView>
//       </View>
//     </View> */}
//   {/* </ImageBackground> */}
// // </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  form: {
    flexGrow: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginTop: 146,
    alignItems: "center",
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    marginTop: -60,
  },
  userPhoto: {
    flex: 1,
    borderRadius: 16,
  },

  userImageButton: {
    position: "absolute",
    left: 107,
    bottom: 14,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: "#E8E8E8",

    overflow: "hidden",
    transform: [{ rotate: "45deg" }],
  },
  btnLogOut: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  listView: {
    flex: 1,
    paddingTop: 20,
  },
  userName: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.3,
  },
  // image: { borderRadius: 16 },
  // userCard: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingVertical: 32,
  //   gap: 8,
  //   alignSelf: "flex-start",
  // },
});

export default ProfileScreen;
