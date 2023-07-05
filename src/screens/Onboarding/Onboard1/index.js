import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Onboard1 = ({ navigation }) => {
  return (
    <View>
      <Text>Onboard1</Text>
      <Button
        title="Go to onboard 2"
        onPress={() => {
          navigation.navigate("Onboard2");
        }}
      />
    </View>
  );
};

export default Onboard1;

const styles = StyleSheet.create({});
