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
  CommonActions,
  useIsFocused,
} from "@react-navigation/native";
import { supabase } from "../../../../../supabase-service";

// component import
import PageHeader from "../../../../components/PageHeader";
import FormComponent from "../../../../components/FormComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

const UserProfile = ({ navigation }) => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const passedfirstName = route.params?.firstName;
  const passedLastName = route.params?.lastName;
  const passedMobileNo = route.params?.mobileNo;
  const passedposition = route.params?.position;
  const { userEmail } = useUser();
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [firstName, setFirstName] = useState(passedfirstName);
  const [lastName, setLastName] = useState(passedLastName);
  const [phone, setPhone] = useState(passedMobileNo);
  const [position, setPosition] = useState(passedposition);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     retrieveUserData();
  //   }, [])
  // );

  // useEffect(() => {
  //   if (isFocused) {
  //     retrieveUserData();
  //   }
  // }, [isFocused]);

  const navigateBackToProfileStack = () => {
    // Reset the navigation stack and navigate to the MainScreen of ProfileStack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MainScreen" }], // Adjust the route name as needed
      })
    );
  };

  // console.log(passedfirstName);
  // console.log(passedLastName);
  // console.log(passedMobileNo);
  // console.log(passedposition);

  // useEffect(() => {
  //   retrieveUserData();
  //   if (userData) {
  //     setFirstName(userData ? userData[0]?.FirstName : "");
  //     setLastName(userData ? userData[0]?.LastName : "");
  //     setPhone(userData ? userData[0]?.PhoneNumber : "");
  //     setPosition(userData ? userData[0]?.Position : "");
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   retrieveUserData();
  //   setFirstName(passedfirstName);
  //   setLastName(passedLastName);
  //   setPhone(passedMobileNo);
  //   setPosition(passedposition);
  // }, []);

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

  const editUserDetails = async () => {
    try {
      const { error } = await supabase
        .from("Users")
        .update({
          FirstName: firstName,
          LastName: lastName,
          PhoneNumber: phone,
          Position: position,
        })
        .eq("UserEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("User details updated");
        setEditable(false);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  return (
    <View style={styles.mainCntnr}>
      <PageHeader
        headerText="User profile"
        onPress={() => navigation.goBack()}
        TextColour="#000"
      />
      {/* {userData ? ( */}
      <View>
        <View>
          <FormComponent
            formName="Email"
            placeHolder="something"
            // onFocus={() => {
            //   Alert.alert("Cannot edit user email at this time");
            // }}
            borderColor
            color="grey"
            value={userEmail}
            // onChangeText
            secureTextEntry={false}
            editable={false}
          />
        </View>
        <View style={styles.formCtnr}>
          <FormComponent
            formName="First name"
            // placeHolder="something"
            // onFocus
            borderColor
            color="grey"
            value={firstName}
            onChangeText={(value) => {
              setFirstName(value);
            }}
            secureTextEntry={false}
            editable={editable}
          />
        </View>
        <View style={styles.formCtnr}>
          <FormComponent
            formName="Last name"
            // placeHolder="something"
            // onFocus
            borderColor
            color="grey"
            value={lastName}
            onChangeText={(value) => {
              setLastName(value);
            }}
            secureTextEntry={false}
            editable={editable}
          />
        </View>
        <View style={styles.formCtnr}>
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
        </View>
        <View style={styles.buttonCntnr}>
          <ButtonComponent
            bgColour="#008000"
            onPress={() => {
              setEditable(!editable);
              if (editable) {
                editUserDetails();
                // navigateBackToProfileStack();
                // navigation.goBack();
              }
            }}
            ButtonText={editable ? "Save" : "Edit"}
            textColour="#fff"
          />
        </View>
      </View>
      {/* // ) : ( // Loading() // )} */}
    </View>
  );
};

export default UserProfile;

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
