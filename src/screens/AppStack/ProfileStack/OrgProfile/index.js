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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../../../../supabase-service";

//component imports
import PageHeader from "../../../../components/PageHeader";
import FormComponent from "../../../../components/FormComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

const OrgProfile = ({ navigation }) => {
  const { userEmail } = useUser();
  const [userData, setUserData] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [productType, setProductType] = useState(null);
  const [editable, setEditable] = useState(false);

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  useEffect(() => {
    retrieveUserData();
    if (userData) {
      setCompanyName(userData ? userData[0]?.CompanyName : "");
      setIndustry(userData ? userData[0]?.Industry : "");
      setProductType(userData ? userData[0]?.ProductType : "");
    }
  }, [userData]);

  const retrieveUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select()
        .eq("UserEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setUserData(data);
        // Alert.alert("Success");
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      retrieveUserData();
    }, [])
  );

  return (
    <View style={styles.mainCntnr}>
      <PageHeader
        headerText="Company profile"
        onPress={() => navigation.goBack()}
        TextColour="#000"
      />
      {userData ? (
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
              // onChangeText
              secureTextEntry={false}
              editable={false}
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
                setFirstName(value);
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
                setLastName(value);
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
                  editUserDetails();
                }
              }}
              ButtonText={editable ? "Save" : "Edit"}
              textColour="#fff"
            />
          </View>
        </View>
      ) : (
        Loading()
      )}
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
