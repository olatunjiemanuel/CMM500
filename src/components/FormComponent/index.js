import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const FormComponent = (props) => {
  const { formName, placeHolder, onFocus, borderColor, color } = props;

  return (
    <View style={[styles.formCntnr, { borderColor: borderColor }]}>
      <View>
        <Text style={[{ color: color }]}>{formName}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeHolder}
        onFocus={onFocus}
      />
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  formCntnr: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 30,
  },
});
