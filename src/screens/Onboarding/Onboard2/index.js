import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Button } from "react-native";

//screen imports
import AppStack from "../../AppStack";

// component imports
import FormComponent from "../../../components/FormComponent";
import PageHeader from "../../../components/PageHeader";

const Onboard2 = ({ navigation, onComplete }) => {
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

      <View>
        <FormComponent />
      </View>
      <Button title="Got to AppStack" onPress={handleOnboardingComplete} />
    </View>
  );
};

export default Onboard2;

const styles = StyleSheet.create({
  mainCntnr: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 50,
    paddingHorizontal: 20,
  },
});
