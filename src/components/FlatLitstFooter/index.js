import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FlatListFooter = () => {
  return (
    <View style={styles.footerCntnr}>
      <Text>No more items to show</Text>
    </View>
  );
};

export default FlatListFooter;

const styles = StyleSheet.create({
  footerCntnr: {
    marginTop: 30,
    marginBottom: 300,
    alignItems: "center",
  },
});
