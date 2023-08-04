import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const DisplayInventriComponent = () => {
  return (
    <TouchableOpacity style={styles.mainCntnr}>
      <View style={styles.imagCntnr}>
        <Text>Img</Text>
      </View>
      <View style={styles.middle}>
        <Text>ItemName</Text>
        <Text style={styles.qtyCntnr}>Quantity: {}</Text>
      </View>
      <View>
        <MaterialIcons name="arrow-forward-ios" size={30} color="grey" />
      </View>
    </TouchableOpacity>
  );
};

export default DisplayInventriComponent;

const styles = StyleSheet.create({
  mainCntnr: {
    backgroundColor: "#fff",
    flexDirection: "row",
    // height: 50,
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
  },
  imagCntnr: {
    marginRight: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    backgroundColor: "red",
    alignItems: "center",
  },
  qtyCntnr: {
    marginTop: 10,
  },
  middle: {
    paddingRight: 160,
  },
});
