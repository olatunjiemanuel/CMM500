import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Onboard1 = ({ navigation }) => {
  return (
    <View>
      <Text>Onboard1</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Onboard2");
        }}
        style={styles.buttonCntnr}
      >
        <Text>title="Go to onboard 2"</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboard1;

const styles = StyleSheet.create({
  buttonCntnr: {
    backgroundColor: "blue",
  },
});
