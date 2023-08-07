import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

export const PublicationCard = ({
  title,
  imageUrl,
  geoPosition,
  commentsCount,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: 343, height: 240 }]}
      />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardInfo}>
        <View style={[styles.cardInfoBox, { gap: 6 }]}>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={styles.countText}>{commentsCount}</Text>
        </View>
        <View style={styles.cardInfoBox}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.locationText}>{geoPosition}</Text>
        </View>
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
  },
  countText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    lineHeight: 19,
    color: "#212121",
  },
});
