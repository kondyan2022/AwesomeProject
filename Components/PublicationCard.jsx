import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export const PublicationCard = ({
  title,
  imageUrl,
  geoPosition,
  commentsCount,
  likesCount,
  location,
  messageIcon,
  thumbsIcon,
  navigation,
  id,
}) => {
  console.log(location);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: 343, height: 240 }]}
      />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardInfo}>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <TouchableOpacity
            onPress={() => {
              return navigation.navigate("Comments", { id: id });
            }}
          >
            <View style={[styles.cardInfoBox, { gap: 6 }]}>
              <Feather name="message-circle" size={24} {...messageIcon} />
              <Text style={styles.countText}>{commentsCount}</Text>
            </View>
          </TouchableOpacity>
          {likesCount >= 0 && (
            <View style={[styles.cardInfoBox, { gap: 6 }]}>
              <Feather name="thumbs-up" size={24} {...thumbsIcon} />
              <Text style={styles.countText}>{likesCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Map", { location: location })}
        >
          <View style={styles.cardInfoBox}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={styles.locationText}>{geoPosition}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { marginBottom: 8, borderRadius: 8 },
  cardTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 34,
  },
  cardInfoBox: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
    marginLeft: "auto",
  },
  countText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    lineHeight: 19,
    color: "#212121",
  },
});
