import { Button, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screen imports
import ItemsScreen from "../../ItemsScreen/index";
import ItemView from "../ItemView/index";

const Stack = createNativeStackNavigator();

const InvenTriStack = () => {
  return (
    <NavigationContainer independent={true} headerMode={false}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ItemsScreen" component={ItemsScreen} />
        <Stack.Screen name="ItemView" component={ItemView} />
        {/* <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="OrgProfile" component={OrgProfile} />
        <Stack.Screen name="SecurityPage" component={SecurityPage} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="Accessibility" component={Accessibility} />
        <Stack.Screen name="SignOut" component={SignOut} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InvenTriStack;

const styles = StyleSheet.create({});
