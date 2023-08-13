import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../../../UserContext";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { supabase } from "../../../../../supabase-service";

//component imports
import PageHeader from "../../../../components/PageHeader";
import FormComponent from "../../../../components/FormComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

const OrgProfile = ({ navigation }) => {
  const route = useRoute();
  const passedCompany = route.params?.companyName;
  const passedIndustry = route.params?.industryName;
  const passedProductType = route.params?.productType;
  const { userEmail } = useUser();
  const [userData, setUserData] = useState(null);
  const [companyName, setCompanyName] = useState(passedCompany);
  const [industry, setIndustry] = useState(passedIndustry);
  const [productType, setProductType] = useState(passedProductType);
  const [editable, setEditable] = useState(false);

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  // console.log(passedCompany);
  // console.log(passedIndustry);
  // console.log(passedProductType);

  // useEffect(() => {
  //   retrieveUserData();
  //   if (userData) {
  //     setCompanyName(userData ? userData[0]?.CompanyName : "");
  //     setIndustry(userData ? userData[0]?.Industry : "");
  //     setProductType(userData ? userData[0]?.ProductType : "");
  //   }
  // }, []);

  // const retrieveUserData = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("Users")
  //       .select()
  //       .eq("UserEmail", userEmail);
  //     if (error) {
  //       Alert.alert("Error", error.message);
  //     } else {
  //       setUserData(data);
  //       setCompanyName(userData ? userData[0]?.CompanyName : "");
  //       setIndustry(userData ? userData[0]?.Industry : "");
  //       setProductType(userData ? userData[0]?.ProductType : "");
  //       // Alert.alert("Success");
  //       // console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     Alert.alert("Error", error.message);
  //   }
  // };

  const editCompanyDetails = async () => {
    try {
      const { error } = await supabase
        .from("Users")
        .update({
          CompanyName: companyName,
          Industry: industry,
          ProductType: productType,
        })
        .eq("UserEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Company details updated");
        setEditable(false);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     retrieveUserData();
  //   }, [])
  // );

  return (
    <View style={styles.mainCntnr}>
      <PageHeader
        headerText="Company profile"
        onPress={() => navigation.goBack()}
        TextColour="#000"
      />
      {/* {userData ? ( */}
      <View>
        <View>
          <FormComponent
            formName="Company name"
            placeHolder="something"
            // onFocus={() => {
            //   Alert.alert("Cannot edit user email at this time");
            // }}
            borderColor
            color="grey"
            value={companyName}
            onChangeText={(value) => {
              setCompanyName(value);
            }}
            secureTextEntry={false}
            editable={editable}
          />
        </View>
        <View style={styles.formCtnr}>
          <FormComponent
            formName="Industry"
            // placeHolder="something"
            // onFocus
            borderColor
            color="grey"
            value={industry}
            onChangeText={(value) => {
              setIndustry(value);
            }}
            secureTextEntry={false}
            editable={editable}
          />
        </View>
        <View style={styles.formCtnr}>
          <FormComponent
            formName="Product type"
            // placeHolder="something"
            // onFocus
            borderColor
            color="grey"
            value={productType}
            onChangeText={(value) => {
              setProductType(value);
            }}
            secureTextEntry={false}
            editable={editable}
          />
        </View>
        {/* <View style={styles.formCtnr}>
            <FormComponent
              formName="Mobile No."
              // placeHolder="something"
              // onFocus
              borderColor
              color="grey"
              value={phone}
              onChangeText={(value) => {
                setPhone(value);
              }}
              secureTextEntry={false}
              editable={editable}
            />
          </View>
          <View style={styles.formCtnr}>
            <FormComponent
              formName="Positon"
              // placeHolder="something"
              // onFocus
              borderColor
              color="grey"
              value={position}
              onChangeText={(value) => {
                setPosition(value);
              }}
              secureTextEntry={false}
              editable={editable}
            />
          </View> */}
        <View style={styles.buttonCntnr}>
          <ButtonComponent
            bgColour="#008000"
            onPress={() => {
              setEditable(!editable);
              if (editable) {
                editCompanyDetails();
                navigation.goBack();
              }
            }}
            ButtonText={editable ? "Save" : "Edit"}
            textColour="#fff"
          />
        </View>
      </View>
      {/* ) : (
        Loading()
      )} */}
    </View>
  );
};

export default OrgProfile;

const styles = StyleSheet.create({
  mainCntnr: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 50,
  },
  formCtnr: {
    marginTop: 20,
  },
  buttonCntnr: {
    marginTop: 40,
  },
});
