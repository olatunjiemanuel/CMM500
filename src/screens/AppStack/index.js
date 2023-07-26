import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";

//Tabs import
import HomeStack from "./HomeStack";
import Search from "./Search";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabelStyle: {
            color: "grey",
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="home"
                size={24}
                color={focused ? "#008000" : "grey"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabelStyle: {
            color: "grey",
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="search"
                size={24}
                color={focused ? "#008000" : "grey"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabelStyle: {
            color: "grey",
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="user"
                size={24}
                color={focused ? "#008000" : "grey"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
