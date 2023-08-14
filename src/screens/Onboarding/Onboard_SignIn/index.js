import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../../../supabase-service";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../../UserContext";

// const superbaseUrl = "https://qxtviuohozgpbhksexyj.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dHZpdW9ob3pncGJoa3NleHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzMDQzOTUsImV4cCI6MjAwMzg4MDM5NX0.KXrZPsh_3xQAj2MG_9WuaHC2X_L1QyDImrCXTcuN0jM";

// const supabase = createClient(superbaseUrl, supabaseKey, {
//   persistSessions: true,
//   localStorage: AsyncStorage,
// });

//screen imports
import AppStack from "../../AppStack";

// component imports
import FormComponent from "../../../components/FormComponent";
import PageHeader from "../../../components/PageHeader";
import ButtonComponent from "../../../components/ButtonComponent";

const Onboard_SignIn = ({ navigation, onComplete }) => {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPassFocused, setPassFocused] = useState(false);
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState(null);

  const { setUserEmail } = useUser();

  useEffect(() => {
    setAuth(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      setAuth(session);
      console.log(session?.user.email);
      setEmail(session?.user?.email);
      setUserEmail(session?.user.email);
    });
    // console.log("User state updated:", user);
  }, []);
  // useEffect(() => {
  //   setUser
  //   console.log("User state updated:", user);
  // }, [user]);

  const handleOnboardingComplete = () => {
    onComplete();
  };

  const getUserDetails = async () => {
    // try {
    //   const session = supabase.auth.user();
    //   if (session) {
    //     // If a user is authenticated, set the user details to the state
    //     setUser(session);
    //     console.log(user);
    //   } else {
    //     console.log("No active session");
    //     // If there is no active session, clear the user details from the state
    //     setUser(null);
    //   }
    // } catch (error) {
    //   console.error("Error fetching message", error.message);
    // }
    try {
      const session = supabase.auth.getSession();
      const User = session?.user.email;
      console.log(User);
      console.log("Session:", session);
      if (session) {
        // If a user is authenticated, set the user details to the state
        setUser(session.user);
        console.log(session?.user.email);
        // console.log(session.user);
      } else {
        console.log("No active session");
        // If there is no active session, clear the user details from the state
        setUser(null);
      }
    } catch (error) {
      // console.log(error.message);
      console.error("Error fetching user details", error.message);
    }
  };

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

  const handleSignIn = async () => {
    // Replace 'emailValue' and 'passwordValue' with the actual values from your FormComponent
    // setEmailValue(emailValue);
    // setPasswordValue(passwordValue);
    try {
      console.log(emailValue);
      console.log(passwordValue);
      const { user, error } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: passwordValue,
      });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success");
        console.log(user);
        handleOnboardingComplete();
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.mainCntnr}>
      <View>
        <PageHeader
          headerText="Sign In"
          onPress={() => {
            navigation.goBack();
          }}
          TextColour="#008000"
        />
      </View>
      <View style={styles.emailCntnr}>
        <FormComponent
          value={emailValue}
          formName="Email"
          placeHolder="Enter your email"
          onFocus={() => {
            setPassFocused(false);
            setEmailFocused(true);
          }}
          borderColor={isEmailFocused ? "#008000" : null}
          color={isEmailFocused ? "#008000" : null}
          onChangeText={(text) => setEmailValue(text)}
        />
      </View>
      {/* <View style={{ borderWidth: 1 }}>
        <Text>{email}</Text>
      </View> */}
      <View style={styles.passCntnr}>
        <FormComponent
          secureTextEntry={true}
          value={passwordValue}
          formName="Password"
          placeHolder="Create a password"
          onFocus={() => {
            setEmailFocused(false);
            setPassFocused(true);
          }}
          borderColor={isPassFocused ? "#008000" : null}
          color={isPassFocused ? "#008000" : null}
          onChangeText={(text) => setPasswordValue(text)}
        />
      </View>
      <View style={styles.RegisterbuttonCntnr}>
        <ButtonComponent
          bgColour="#008000"
          onPress
          ButtonText="Continue   >"
          textColour="#fff"
        />
      </View>
      <View style={styles.SignInbuttonCntnr}>
        <ButtonComponent
          bgColour="#008000"
          onPress={handleSignIn}
          ButtonText="Sign In"
          textColour="#fff"
        />
      </View>
      {/* <Button title="Got to AppStack" onPress={handleOnboardingComplete} />
      <Button title="show user details" onPress={getUserDetails} />
      <Button
        title="SignOut"
        onPress={() => {
          SignOut();
        }}
      /> */}
    </View>
  );
};

export default Onboard_SignIn;

const styles = StyleSheet.create({
  mainCntnr: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 50,
    paddingHorizontal: 20,
  },
  emailCntnr: { marginTop: 40 },
  passCntnr: { marginTop: 20 },
  RegisterbuttonCntnr: { marginTop: 150 },
  SignInbuttonCntnr: { marginTop: 20 },
});
