import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const FloatingButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity style={styles.mainCntnr} onPress={onPress}>
      <AntDesign name="addfile" size={24} color="#fff" />
      <Text style={{ color: "#fff" }}>add item</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  mainCntnr: {
    backgroundColor: "#008000",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
});
