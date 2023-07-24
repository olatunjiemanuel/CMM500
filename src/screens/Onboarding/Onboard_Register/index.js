import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";

//screen imports
import AppStack from "../../AppStack";

// component imports
import FormComponent from "../../../components/FormComponent";
import PageHeader from "../../../components/PageHeader";
import ButtonComponent from "../../../components/ButtonComponent";

const Onboard_Register = ({ navigation, onComplete }) => {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPassFocused, setPassFocused] = useState(false);

  const handleOnboardingComplete = () => {
    onComplete();
  };
  return (
    <View style={styles.mainCntnr}>
      <View>
        <PageHeader
          headerText="Welcome to Inventri"
          onPress={() => {
            navigation.goBack();
          }}
          TextColour="#008000"
        />
      </View>
      <View style={styles.emailCntnr}>
        <FormComponent
          formName="Email"
          placeHolder="Enter your email"
          onFocus={() => {
            setPassFocused(false);
            setEmailFocused(true);
          }}
          borderColor={isEmailFocused ? "#008000" : null}
          color={isEmailFocused ? "#008000" : null}
        />
      </View>
      <View style={styles.passCntnr}>
        <FormComponent
          formName="Password"
          placeHolder="Create a password"
          onFocus={() => {
            setEmailFocused(false);
            setPassFocused(true);
          }}
          borderColor={isPassFocused ? "#008000" : null}
          color={isPassFocused ? "#008000" : null}
        />
      </View>
      <View style={styles.RegisterbuttonCntnr}>
        <ButtonComponent
          bgColour="#008000"
          onPress={() => {
            navigation.navigate("OnboardUser");
          }}
          ButtonText="Continue   >"
          textColour="#fff"
        />
      </View>
      <View style={styles.SignInbuttonCntnr}>
        <ButtonComponent
          bgColour="#008000"
          onPress={() => {
            navigation.navigate("Onboard_SignIn");
          }}
          ButtonText="Sign In"
          textColour="#fff"
        />
      </View>
      <Button title="Got to AppStack" onPress={handleOnboardingComplete} />
    </View>
  );
};

export default Onboard_Register;

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
