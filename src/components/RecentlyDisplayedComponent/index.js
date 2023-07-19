import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

//component imports
import { Feather } from "@expo/vector-icons";
import CloseButtonSvg from "../../../assets/SVGs/CloseButtonSvg";

const RecentlyDisplayedComponent = (props) => {
  const { text, key, onPress } = props;
  return (
    <View style={styles.mainCntnr}>
      <TouchableOpacity style={styles.mainCntnr} key={key} onPress={onPress}>
        <View style={styles.searchSvgCntnr}>
          <Feather name="search" size={24} />
        </View>
        <View style={styles.textCntnr}>
          <Text style={styles.textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeCntnr}>
        <CloseButtonSvg width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default RecentlyDisplayedComponent;

const styles = StyleSheet.create({
  mainCntnr: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  textCntnr: {
    width: 250,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 300,
  },
  searchSvgCntnr: {
    paddingRight: 10,
  },
  removeCntnr: { paddingLeft: 40 },
});
