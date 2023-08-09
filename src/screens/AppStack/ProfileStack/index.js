import { Button, StyleSheet, View, Platform, Text, Alert } from "react-native";
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
import MediumProfile from "../../../components/MediumProfile";

//icon Imports
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../../../supabase-service";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const SignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success Logout");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const MainScreen = ({ navigation }) => {
    return (
      <View style={styles.mainCntnr}>
        <View style={styles.pageHeaderCntnr}>
          <Text style={styles.pageHeaderText}>Profile</Text>
        </View>
        <View style={styles.userProfileCntnr}>
          <ProfileComponent
            icon={
              <View>
                <FontAwesome name="user" size={24} color="#008000" />
              </View>
            }
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
            label="Olatunji Adenuga"
            navLabel="view profile"
          />
        </View>
        <View style={styles.orgProfile}>
          <ProfileComponent
            icon={<Octicons name="organization" size={24} color="#008000" />}
            onPress={() => {
              navigation.navigate("OrgProfile");
            }}
            label="Organization"
            navLabel="view company profile"
          />
        </View>
        <View style={styles.orgProfile}>
          <MediumProfile
            icon={<FontAwesome5 name="user-lock" size={20} color="#008000" />}
            label="My security"
            onPress={() => {
              navigation.navigate("SecurityPage");
            }}
          />
        </View>
        <View style={styles.orgProfile}>
          <MediumProfile
            icon={
              <MaterialIcons name="support-agent" size={25} color="#008000" />
            }
            label="Help & Support"
            onPress={() => {
              navigation.navigate("HelpSupport");
            }}
          />
        </View>
        <View style={styles.orgProfile}>
          <MediumProfile
            icon={
              <MaterialIcons name="accessibility" size={24} color="#008000" />
            }
            label="Accessibility options"
            onPress={() => {
              navigation.navigate("Accessibility");
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            SignOut();
          }}
          style={styles.signOutBtnCntnr}
          // onPress={() => {
          //      navigation.navigate("SignOut");
          //    }}
        >
          <FontAwesome name="sign-out" size={24} color="#008000" />
          <Text style={styles.signOutBtnText}> Sign Out</Text>
        </TouchableOpacity>
        {/* <View>
          <MediumProfile label="My security" />
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
        /> */}
      </View>
    );
  };

  return (
    <NavigationContainer independent={true} headerMode={false}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          screenOptions={{ headerShown: false }}
        />
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
    paddingTop: Platform.OS === "android" ? 30 : 50,
  },
  pageHeaderCntnr: {
    marginTop: 40,
  },
  pageHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  userProfileCntnr: {
    marginTop: 20,
  },
  orgProfile: {
    marginTop: 10,
  },
  signOutBtnCntnr: {
    marginTop: 150,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  signOutBtnText: {
    fontSize: 20,
    color: "#008000",
  },
});
