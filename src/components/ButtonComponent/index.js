import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ButtonComponent = (props) => {
  const { bgColour, onPress, ButtonText, textColour } = props;
  return (
    <TouchableOpacity
      style={[styles.buttonCntnr, { backgroundColor: bgColour }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColour }]}>
        {ButtonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonCntnr: {
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: 700,
  },
});
