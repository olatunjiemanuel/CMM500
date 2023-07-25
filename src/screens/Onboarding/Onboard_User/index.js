import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";

//component import
import PageHeader from "../../../components/PageHeader";
import FormComponent from "../../../components/FormComponent";
import ButtonComponent from "../../../components/ButtonComponent";

const Onboard_User = ({ navigation }) => {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPassFocused, setPassFocused] = useState(false);
  return (
    <View style={styles.mainCntnr}>
      <PageHeader
        headerText="Tell us a little about you"
        onPress={() => {
          navigation.goBack();
        }}
        TextColour="#008000"
      />
      <View style={styles.firstNameCntnr}>
        <FormComponent
          formName="First Name"
          placeHolder="Enter your firstname"
          // onFocus={() => {
          //   setPassFocused(false);
          //   setEmailFocused(true);
          // }}
          // borderColor={isEmailFocused ? "#008000" : null}
          // color={isEmailFocused ? "#008000" : null}
        />
      </View>
      <View style={styles.lastNameCntnr}>
        <FormComponent
          formName="Last name"
          placeHolder="Enter your last name"
        />
      </View>
      <View style={styles.phoneCntnr}>
        <FormComponent
          formName="Phone No."
          placeHolder="Enter your mobile number"
        />
      </View>
      <View style={styles.languageCntnr}>
        <FormComponent
          formName="Select a language"
          placeHolder="English(United Kingdom)"
        />
      </View>
      <View style={styles.textCntnr}>
        <Text style={styles.text}>
          We use these details to help us get to know you better . . .
        </Text>
      </View>
      <View style={styles.BtnCntnr}>
        <ButtonComponent
          bgColour="#008000"
          onPress={() => {
            navigation.navigate("Onboarding_Company");
          }}
          ButtonText="Continue >"
          textColour="#fff"
        />
      </View>
    </View>
  );
};

export default Onboard_User;

const styles = StyleSheet.create({
  mainCntnr: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 50,
    paddingHorizontal: 20,
  },
  firstNameCntnr: { marginTop: 10 },
  lastNameCntnr: { marginTop: 10 },
  phoneCntnr: { marginTop: 10 },
  languageCntnr: { marginTop: 10 },
  textCntnr: { marginTop: 40, marginBottom: 20 },
  text: {
    width: 305,
    height: 154,
    fontSize: 30,
    color: "#008000",
  },
  BtnCntnr: { marginTop: 10 },
});
