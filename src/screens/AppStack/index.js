import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Tabs import
import HomeStack from "./HomeStack";
import Search from "./Search";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
