import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileComponent = () => {
  return (
    <TouchableOpacity style={styles.mainCntnr}>
      <View style={styles.iconCntnr}>
        <Text style={styles.iconText}>PC</Text>
      </View>
      <View style={styles.textCntnr}>
        <Text>ProfileComponent</Text>
        <Text>View profile</Text>
      </View>
      <View>
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  mainCntnr: {
    backgroundColor: "#008000",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  iconCntnr: {
    borderWidth: 1,
    // width: 20,
    // height: 20,
    borderRadius: 30,
  },
  iconText: {
    padding: 20,
  },
  textCntnr: {},
});
