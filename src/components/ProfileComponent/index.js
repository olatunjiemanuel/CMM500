import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileComponent = (props) => {
  const { onPress, label, navLabel, icon } = props;
  return (
    <TouchableOpacity style={styles.mainCntnr} onPress={onPress}>
      <View style={styles.iconCntnr}>{icon}</View>
      <View style={styles.textCntnr}>
        <Text style={styles.text}>{label}</Text>
        <Text style={[styles.text, { marginTop: 10 }]}>{navLabel}</Text>
      </View>
      <View style={styles.arrowCntnr}>
        <MaterialIcons name="arrow-forward-ios" size={15} color="#008000" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  mainCntnr: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  iconCntnr: {
    // borderWidth: 1,
    // width: 20,
    // height: 20,
    // borderRadius: 30,
    // borderColor: "#fff",
  },
  iconText: {
    padding: 20,
    color: "#008000",
  },
  textCntnr: {
    // justifyContent: "space-between",
    paddingVertical: 20,
    wdith: 50,
  },
  text: {
    color: "#000",
    fontWeight: "500",
  },
});
