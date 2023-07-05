import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen imports
import AppStack from "./src/screens/AppStack";
import OnboardingStack from "./src/screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
  const onboard = 0;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {onboard < 1 ? (
          <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
        ) : (
          <Stack.Screen name="AppStack" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
