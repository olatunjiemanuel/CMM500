import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "../AppStack";
// import { NavigationContainer, withNavigation } from "@react-navigation/native";

//screen imports
import Onboard1 from "./Onboard1";
import Onboard_Register from "./Onboard_Register";
import Onboard_SignIn from "./Onboard_SignIn";
import OnboardUser from "./Onboard_User";
import Onboarding_Company from "./Onboarding_Company";

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
        <Stack.Screen name="Onboard_Register">
          {(props) => (
            <Onboard_Register
              {...props}
              onComplete={handleOnboardingComplete}
            />
          )}
        </Stack.Screen>
        {/* <Stack.Screen name="Onboard_SignIn" component={Onboard_SignIn} /> */}
        <Stack.Screen name="Onboard_SignIn">
          {(props) => (
            <Onboard_SignIn {...props} onComplete={handleOnboardingComplete} />
          )}
        </Stack.Screen>

        <Stack.Screen name="OnboardUser" component={OnboardUser} />
        <Stack.Screen name="Onboarding_Company">
          {(props) => (
            <Onboarding_Company
              {...props}
              onComplete={handleOnboardingComplete}
            />
          )}
        </Stack.Screen>
        {/* <Stack.Screen
          name="Onboarding_Company"
          component={Onboarding_Company}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OnboardingStack;

const styles = StyleSheet.create({});
