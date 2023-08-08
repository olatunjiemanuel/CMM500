import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

// component Imports
import { MaterialIcons } from "@expo/vector-icons";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

const MonthlySummary = () => {};

const HomeStack = () => {
  return (
    <View style={styles.mainCntnr}>
      <View style={styles.pageHeaderCntnr}>
        <Text style={styles.pageHeaderText}>Home</Text>
      </View>
      <View style={styles.inventorySummaryCntnr}>
        <View style={styles.summaryHeaderCntnr}>
          <MaterialIcons name="inventory" size={24} color="grey" />
          <Text style={styles.summaryHeaderTxt}>Inventory summary</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  mainCntnr: {
    marginHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 30 : 50,
  },
  pageHeaderCntnr: {
    marginTop: 40,
  },
  pageHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  inventorySummaryCntnr: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  summaryHeaderCntnr: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryHeaderTxt: {
    marginLeft: 10,
  },
});
