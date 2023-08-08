import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileComponent = (props) => {
  const { onPress, label, icon } = props;
  return (
    <TouchableOpacity style={styles.mainCntnr} onPress={onPress}>
      <View style={styles.iconCntnr}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.textCntnr}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <View>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  // iconCntnr: {
  //   borderWidth: 1,
  //   // width: 20,
  //   // height: 20,
  //   borderRadius: 30,
  //   borderColor: "#fff",
  // },
  iconText: {
    paddingVertical: 20,
    color: "#000",
  },
  // textCntnr: { backgroundColor: "red" },
  text: {
    color: "#000",
    fontWeight: "500",
  },
});
