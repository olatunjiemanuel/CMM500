import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PageHeader = (props) => {
  const { headerText, onPress, TextColour } = props;
  return (
    <View style={styles.mainCntnr}>
      <TouchableOpacity onPress={onPress} style={styles.goBackCntnr}>
        <AntDesign name="arrowleft" size={24} color="#008000" />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: TextColour }]}>
        {headerText}
      </Text>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  mainCntnr: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackCntnr: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
