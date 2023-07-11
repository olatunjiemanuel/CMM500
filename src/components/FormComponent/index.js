import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const FormComponent = () => {
  return (
    <View>
      <TextInput style={styles.textInput} />
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
  },
});
