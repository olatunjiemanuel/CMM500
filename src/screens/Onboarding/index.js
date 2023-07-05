import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
// import { NavigationContainer, withNavigation } from "@react-navigation/native";

const OnboardingStack = ({ navigation }) => {
  return (
    <View>
      <Text>OnboardingStack</Text>
      <Button title="Go home" onPress={() => navigation.navigate("AppStack")} />
    </View>
  );
};

export default OnboardingStack;

const styles = StyleSheet.create({});
