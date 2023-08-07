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
import { PublicationCard } from "../Components/PublicationCard";
import { nanoid } from "react";
const user = {
  name: "Nataliya Romanova",
  email: "email@example.com",
  imageUrl:
    "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1692576000&Signature=JXLkqkobjU4C3WK3~4eU0EMuIXwoTgutLjJmqk2-YEvOdWwu~FMH3pX4qvqoMMRPg3mFJrVCT7PaB8jYweV4qrr0q1DvNRrIrzQK~~A0DG-z~mqkNOBj00xIAA8N1Wlnr-LWa2PJyhQ8pamgaVFVnE2u3xjxJiVa05KAdhF2jPBLmsBko-I-qi4yzbEzCdp3SgUr8lPSLdEfyfcpKobjN87ULzlpi0zIpKPwR5G6rj4vru1GgabxpIf3XrkqyX7i0mzvD0af5YZAI2YxmQNj2606Bbs6DY6-QyzYVdQ4xSxHv3RcsMIZRclLvgBcCCFPgvmpNkgiCtNc93rHLgtQPw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
};

const notes = [
  {
    id: 1,
    title: "Ліс",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/10eb/cad8/e6009416f2009943b9cd5d7f02695269?Expires=1692576000&Signature=RtJT57RXe6Zk4RXEBuChemGyA0W039C53QKnRptkldbX3tJQgxouGuN1Ot2hn0P3~swKYVT7GubNrksLG8zYL-DohyuEgTm6fJ8-KyYN5QbrDmOjh-OLEp~tmslNyK84rbuz8UecL3mMArQF59ripbLyH35Xrm3dx1Sq6nbRMigA6zVQaFd7T6JCwrq5UC733OU8yiNjluScM3~T~-yijsA2PARjByHkcmnJRO7wJApHZ-QK5SIKTv4bxFiRgHK1tL~7jg8AzydTyP0Tl-jXn4upbj-~GNqx66PJRyWpJ0qQXKYEVvnADi8I4xuynWan2b7PTpRKdwqxtmweSgtwuQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    geoPosition: "Ivano-Frankivs'k Region, Ukraine",
    commentsCount: 8,
  },
  {
    id: 2,
    title: "Захід на Чорному морі",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/f15d/159f/a6ce3338a59841e1e3f926d58a5f2ae7?Expires=1692576000&Signature=a3tZYoGEPpK9bSRzVB8UokdtmtnhraOxbm3XCZkUd1yGz8pcswanebJjjc7IbvxDN~d0BtJciE4nqVMn1l7d2vVC4cxRXnM5DxDTpBKsYoIHLpeheayh0PDKty1raWn9m8IFM~2gxZBFv1tK1fIs51FF5clfDXdDjVw-ILapH1WPsI9lNKkihp-tlfY7IYCi8qY1tDz92W6cLZgNl7dbvXOUsr3pLurTd3Mhb2kJkrar~1AAzM7BZblw9URY2uuD5XnrkAd39THsjMr9J286l4tXY0bl1ZWxNnef2jrCAs-RAfW-S45~f89K8~Uuk3ylw~77o5d3hBxZZHoF3jJN~w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    geoPosition: "Odessa, Ukraine",
    commentsCount: 3,
  },
  {
    id: 3,
    title: "Старий будиночок у Венеції",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/5e97/0c74/9cd3abbfbe6ba44f66a368baac9c2839?Expires=1692576000&Signature=S8T0SwqI~HPX8RSumN6l7q5vhAs8oFoK1KxZeggT123H9ICknPsrs9FeBvpM0kzVoEdLJyufoRwx99tyHB3IBOdEsZuWGr7Wy39cTaE6T9HyUrc5CNvmbsouq7Tp3tT~b-~xfouUfoWnbTySgor7SA-O0Glwnbw3QhVl-1pbSYKepQJ4DxsuHYXlMfhrUG4qYrH3b1tP9M5oqKig~5aymWCn0DZKc40iQdmzadfRI8D7G62thdJ06WW-nVR176HinDZI7wgn7xFOQQmYP1NJogvj1nBehy9y6NnBGL2pWxR6lL2ooHBEBrqD7CINBqRbpTqAOrburGniSLBx8jPbMg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    geoPosition: "Venezia, Italy",
    commentsCount: 50,
  },
];

const PostsScreen = () => {
  return (
    <SafeAreaView
      style={[styles.container, { marginTop: Platform.OS === "ios" ? 0 : 30 }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitile}>Публікації</Text>
        <TouchableOpacity style={styles.btnLogOut}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
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
        <ScrollView style={styles.listView}>
          {notes.map(({ id, title, imageUrl, geoPosition, commentsCount }) => (
            <PublicationCard
              key={id}
              title={title}
              imageUrl={imageUrl}
              geoPosition={geoPosition}
              commentsCount={commentsCount}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnGrid}>
          <Feather name="grid" size={24} color="#212121cd" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNew}>
          <Feather name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUser}>
          <Feather name="user" size={24} color="#212121cd" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    width: "100%",
    // backgroundColor: "red",
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
  main: { flexGrow: 1, paddingHorizontal: 16, alignItems: "center" },
  listView: { height: 0 },
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
  footer: {
    width: "100%",
    flexBasis: "auto",
    // backgroundColor: "tomato",
    flexDirection: "row",
    gap: 31,
    justifyContent: "center",
    paddingTop: 9,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#0000004c",
  },
  btnGrid: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnUser: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNew: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
    backgroundColor: "#FF6C00",
  },
});

export default PostsScreen;
