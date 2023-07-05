import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";

//screen imports
import AppStack from "../../AppStack";

const Onboard2 = ({ navigation, onComplete }) => {
  const handleOnboardingComplete = () => {
    onComplete();
  };
  return (
    <View>
      <Text>Onboard2</Text>
      <Button title="Got to AppStack" onPress={handleOnboardingComplete} />
    </View>
  );
};

export default Onboard2;

const styles = StyleSheet.create({});
