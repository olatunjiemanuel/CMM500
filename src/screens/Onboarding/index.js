import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "../AppStack";
// import { NavigationContainer, withNavigation } from "@react-navigation/native";

//screen imports
import Onboard1 from "./Onboard1";
import Onboard2 from "./Onboard2";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);
  const navigation = useNavigation();

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  if (isOnboardingComplete) {
    return <AppStack />;
  }
  return (
    <NavigationContainer independent={true} headerMode={false}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboard1" component={Onboard1} />
        <Stack.Screen name="Onboard2">
          {(props) => (
            <Onboard2 {...props} onComplete={handleOnboardingComplete} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OnboardingStack;

const styles = StyleSheet.create({});
