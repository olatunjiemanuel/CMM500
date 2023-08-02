import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileComponent = (props) => {
  const { onPress, label } = props;
  return (
    <TouchableOpacity style={styles.mainCntnr} onPress={onPress}>
      <View style={styles.iconCntnr}>
        <Text style={styles.iconText}>PC</Text>
      </View>
      <View style={styles.textCntnr}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <View>
        <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
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
    borderColor: "#fff",
  },
  iconText: {
    padding: 20,
    color: "#fff",
  },
  textCntnr: {},
  text: {
    color: "#fff",
  },
});
