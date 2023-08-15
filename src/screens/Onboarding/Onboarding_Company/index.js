import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { supabase } from "../../../../supabase-service";

//component imports
import PageHeader from "../../../components/PageHeader";
import FormComponent from "../../../components/FormComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { useUser } from "../../../../UserContext";

const Onboarding_Company = ({ navigation, onComplete }) => {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPassFocused, setPassFocused] = useState(false);
  const [company, setCompany] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [position, setPosition] = useState(null);
  const [productType, setProductType] = useState(null);
  const { userEmail } = useUser();

  const handleOnboardingComplete = () => {
    onComplete();
  };

  const saveCompanyDetails = async () => {
    try {
      const { error } = await supabase
        .from("Users")
        .update({
          // id: 2,
          CompanyName: company,
          Industry: industry,
          Position: position,
          ProductType: productType,
        })
        .eq("UserEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        // Alert.alert("Success");
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.mainCntnr}>
      <PageHeader
        headerText="Tell us how you plan to use Inventri"
        onPress={() => {
          navigation.goBack();
        }}
        TextColour="#008000"
      />
      <ScrollView>
        <View style={styles.companyName}>
          <FormComponent
            formName="Company Name"
            placeHolder="Enter your company name"
            onChangeText={(value) => {
              setCompany(value);
            }}
            // onFocus={() => {
            //   setPassFocused(false);
            //   setEmailFocused(true);
            // }}
            // borderColor={isEmailFocused ? "#008000" : null}
            // color={isEmailFocused ? "#008000" : null}
          />
        </View>
        <View style={styles.Industry}>
          <FormComponent
            formName="Industry"
            placeHolder="What industry are you ?"
            onChangeText={(value) => {
              setIndustry(value);
            }}
          />
        </View>
        {/* <View style={styles.phoneCntnr}>
          <FormComponent
            formName="Phone No."
            placeHolder="Enter your mobile number"
          />
        </View> */}
        <View style={styles.jobFunction}>
          <FormComponent
            formName="Job function"
            placeHolder="English(United Kingdom)"
            onChangeText={(value) => {
              setPosition(value);
            }}
          />
        </View>
        <View style={styles.productInventory}>
          <FormComponent
            formName="Type of product inventory"
            placeHolder="e.g Computer hardware"
            onChangeText={(value) => {
              setProductType(value);
            }}
          />
        </View>
        <View style={styles.textCntnr}>
          <Text style={styles.text}>
            We use these details to know what type of preferences your business
            needs . . .
          </Text>
        </View>
        <View style={styles.BtnCntnr}>
          <ButtonComponent
            bgColour="#008000"
            onPress={() => {
              saveCompanyDetails();
              handleOnboardingComplete();
            }}
            ButtonText="Continue >"
            textColour="#fff"
          />
        </View>
        {/* <Text>{userEmail}</Text> */}
      </ScrollView>
    </View>
  );
};

export default Onboarding_Company;

const styles = StyleSheet.create({
  mainCntnr: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 50,
    paddingHorizontal: 20,
  },
  companyName: { marginTop: 10 },
  Industry: { marginTop: 10 },
  phoneCntnr: { marginTop: 10 },
  jobFunction: { marginTop: 10 },
  productInventory: { marginTop: 10 },
  textCntnr: { marginTop: 40, marginBottom: 20 },
  text: {
    width: 305,
    height: 154,
    fontSize: 26,
    color: "#008000",
  },
  BtnCntnr: { marginTop: 10 },
});
