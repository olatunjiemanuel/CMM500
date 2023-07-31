import { Button, StyleSheet, View, ScrollView } from "react-native";
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

//component imports
import ProfileComponent from "../../../components/ProfileComponent/index";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const MainScreen = ({ navigation }) => {
    return (
      <ScrollView style={styles.mainCntnr}>
        <View>
          <ProfileComponent
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
          />
        </View>
        <View>
          <ProfileComponent
            onPress={() => {
              navigation.navigate("OrgProfile");
            }}
          />
        </View>
        <View>
          <ProfileComponent
            onPress={() => {
              navigation.navigate("SecurityPage");
            }}
          />
        </View>
        <View>
          <ProfileComponent
            onPress={() => {
              navigation.navigate("HelpSupport");
            }}
          />
        </View>
        <View>
          <ProfileComponent
            onPress={() => {
              navigation.navigate("Accessibility");
            }}
          />
        </View>
        <View>
          <ProfileComponent
            onPress={() => {
              navigation.navigate("SignOut");
            }}
          />
        </View>

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
      </ScrollView>
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

const styles = StyleSheet.create({
  mainCntnr: {
    marginHorizontal: 20,
  },
});
