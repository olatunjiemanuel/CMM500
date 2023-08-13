import { StyleSheet, Text, View } from "react-native";
import React from "react";

// component imports
import PageHeader from "../../../../components/PageHeader";

const HelpSupport = ({ navigation }) => {
  return (
    <View style={styles.mainCntnr}>
      <PageHeader
        headerText="Help & support"
        onPress={() => navigation.goBack()}
        TextColour="#000"
      />
      <Text style={{ fontSize: 20 }}>
        You can contact the team by giving us a call or sending an email
      </Text>
      <View style={styles.contactCntnr}>
        <Text style={styles.contactText}>Phone: 07827258331 </Text>
      </View>

      <View style={styles.contactCntnr}>
        <Text style={styles.contactText}>Email: inventri@support.com</Text>
      </View>
    </View>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  mainCntnr: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 50,
  },
  contactCntnr: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  contactText: {
    fontWeight: "normal",
  },
});
