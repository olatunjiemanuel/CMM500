import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Tabs import
import HomeStack from "./HomeStack";
import Search from "./Search";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
