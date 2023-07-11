import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

//Component imports
import ButtonComponent from "../../../components/ButtonComponent";

const Onboard1 = ({ navigation }) => {
  return (
    <View style={styles.mainCntnr}>
      <View style={styles.mainTextCntnr}>
        <Text style={styles.mainText}>Keep track of products monthly</Text>
      </View>
      <View style={styles.subTextCntnr}>
        <Text style={styles.subText}>
          Take control of monthly inflow and outflow of products ...
        </Text>
      </View>
      <View style={styles.RegisterButtonCntnr}>
        <ButtonComponent
          bgColour="#fff"
          onPress={() => {
            navigation.navigate("Onboard2");
          }}
          ButtonText="Register"
          textColour="#008000"
        />
      </View>
      <View style={styles.SignInButtonCntnr}>
        <ButtonComponent
          bgColour="#fff"
          onPress={() => {
            navigation.navigate("Onboard2");
          }}
          ButtonText="Sign In"
          textColour="#008000"
        />
      </View>
    </View>
  );
};

export default Onboard1;

const styles = StyleSheet.create({
  mainCntnr: {
    backgroundColor: "#008000",
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 50,
    paddingHorizontal: 20,
  },
  mainTextCntnr: {
    width: 350,
    height: 194,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontWeight: "700",
    fontSize: 40,
    color: "#fff",
  },
  subTextCntnr: {
    width: 271,
    height: 90,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontWeight: "700",
    fontSize: 24,
    color: "#fff",
  },
  RegisterButtonCntnr: { marginTop: 150 },
  SignInButtonCntnr: { marginTop: 50 },
});
