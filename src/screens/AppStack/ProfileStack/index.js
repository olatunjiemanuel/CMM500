import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screenm imports
import UserProfile from "../ProfileStack/UserProfile/index";
import OrgProfile from "../ProfileStack/OrgProfile/index";
import SecurityPage from "../ProfileStack/SecurityPage/index";
import HelpSupport from "../ProfileStack/HelpSupport/index";
import Accessibility from "../ProfileStack/Accessibility/index";
import SignOut from "../ProfileStack/SignOut/index";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const MainScreen = ({ navigation }) => {
    return (
      <View>
        <Text>Main screen first</Text>
        <Button
          title="Go to UserProfile"
          onPress={() => {
            navigation.navigate("UserProfile");
          }}
        />
        <Button
          title="Go to OrgProfile"
          onPress={() => {
            navigation.navigate("OrgProfile");
          }}
        />
        <Button
          title="Go to SecurityPage"
          onPress={() => {
            navigation.navigate("SecurityPage");
          }}
        />
        <Button
          title="Go to HelpSupport"
          onPress={() => {
            navigation.navigate("HelpSupport");
          }}
        />
        <Button
          title="Go to UserProfile"
          onPress={() => {
            navigation.navigate("Accessibility");
          }}
        />
        <Button
          title="Go to SignOut"
          onPress={() => {
            navigation.navigate("SignOut");
          }}
        />
      </View>
    );
  };

  return (
    <NavigationContainer independent={true} headerMode={false}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="OrgProfile" component={OrgProfile} />
        <Stack.Screen name="SecurityPage" component={SecurityPage} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="Accessibility" component={Accessibility} />
        <Stack.Screen name="SignOut" component={SignOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
