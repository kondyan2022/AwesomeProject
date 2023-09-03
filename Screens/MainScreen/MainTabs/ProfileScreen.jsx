import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
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
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, updateUserProfile } from "../../../redux/auth/authSlice";
import {
  getAuth,
  getDisplayName,
  getIsAuth,
  getUserImageURL,
  getUserProfile,
} from "../../../redux/auth/selectors";
import { getPosts } from "../../../redux/posts/selectors";
import { auth, storage } from "../../../firebase/config";
import { signOutUserThunk } from "../../../redux/auth/thunk";
import { clearPosts } from "../../../redux/posts/postsSlice";
import { uriToBlob } from "../../../utils/blobFromPhoto";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const ProfileScreen = ({ navigation, route }) => {
  const imageUserUri = useSelector(getUserImageURL);
  const displayName = useSelector(getDisplayName);
  const isAuth = useSelector(getAuth);
  const { email } = useSelector(getUserProfile);
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  // console.log("profile=>", posts);
  // useEffect(() => {
  //   if (route.params?.imageUri) {
  //     setImageUserUri(route.params.imageUri);
  //   }
  // }, [route]);
  const userPosts = useMemo(
    () => posts.filter((post) => post.uid === auth.currentUser.uid),
    [auth.currentUser.uid, posts]
  );

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const blobFile = await uriToBlob(route.params.imageUri);
        const avatarRef = ref(storage, `${auth.currentUser.uid}/avatar.jpg`);
        await uploadBytes(avatarRef, blobFile, {
          contentType: "image/jpeg",
        });
        const proceedPhoto = await getDownloadURL(avatarRef);

        await updateProfile(auth.currentUser, {
          photoURL: proceedPhoto,
        });
        dispatch(
          updateUserProfile({
            photoURL: proceedPhoto,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (route.params?.imageUri) {
      asyncFn();
      // setImageUserUri(route.params.imageUri);
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={[styles.form]}>
          <View style={styles.userImage}>
            {imageUserUri && (
              <Image
                source={{ uri: imageUserUri }}
                style={[styles.userPhoto, { width: 120, height: 120 }]}
              />
            )}
            <TouchableOpacity
              style={[
                styles.userImageButton,
                imageUserUri ? { transform: [{ rotate: "45deg" }] } : {},
              ]}
              onPress={() => {
                if (imageUserUri) {
                  dispatch(
                    updateUserProfile({
                      photoURL: null,
                    })
                  );
                } else {
                  navigation.navigate("Camera", {
                    key: route.key,
                    avatar: true,
                  });
                }
              }}
            >
              {imageUserUri ? (
                <Feather
                  name="plus"
                  size={22}
                  color="#BDBDBD"
                  backgroundColor="#FFF"
                />
              ) : (
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => {
              dispatch(clearPosts());
              dispatch(signOutUserThunk());
            }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.userName}>{displayName}</Text>
          <FlatList
            data={userPosts}
            renderItem={({
              item: {
                id,
                title,
                imageUri,
                geoPosition,
                comments,
                likes,
                location,
                uid,
              },
            }) => (
              <PublicationCard
                key={id}
                id={id}
                title={title}
                imageUrl={imageUri}
                geoPosition={geoPosition.split(" ").slice(-1)}
                commentsCount={comments.length}
                likesCount={likes.length}
                location={location}
                likes={likes}
                uid={uid}
                messageIcon={{
                  color: "#FF6C00",
                }}
                thumbsIcon={{ color: "#FF6C00" }}
                navigation={navigation}
              />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

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
});

export default ProfileScreen;
