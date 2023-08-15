import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const DisplayInventriComponent = (props) => {
  const { itemName, quantity, onPress, Img } = props;
  return (
    <TouchableOpacity style={styles.mainCntnr} onPress={onPress}>
      <View style={styles.imagCntnr}>{Img}</View>
      <View style={styles.middle}>
        <Text style={styles.nameCntnr}>{itemName}</Text>
        <Text style={styles.qtyCntnr}>Quantity: {quantity}</Text>
      </View>
      <View style={styles.icontCntnr}>
        <MaterialIcons name="arrow-forward-ios" size={20} color="grey" />
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
    marginTop: 10,
  },
  imagCntnr: {
    marginRight: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    backgroundColor: "grey",
    alignItems: "center",
  },
  nameCntnr: { width: 300 },
  qtyCntnr: {
    marginTop: 10,
    width: 100,
  },
  middle: {
    paddingRight: 160,
    width: 220,
  },
});
