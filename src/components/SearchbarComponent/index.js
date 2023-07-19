import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { forwardRef } from "react";

// SVG Imports
import { Feather } from "@expo/vector-icons";

const index = forwardRef((props, ref) => {
  const {
    placeholder,
    onChangeText,
    value,
    onFocus,
    onBlur,
    onSubmitEditing,
    width,
  } = props;

  return (
    <View style={styles.textInputContainer}>
      <View style={{ marginRight: 5 }}>
        <Feather name="search" size={24} />
      </View>
      <View>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={{ width: width }}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          clearTextOnFocus
          clearButtonMode="while-editing"
          ref={ref}
        />
      </View>
    </View>
  );
});

export default index;

const styles = StyleSheet.create({
  textInputContainer: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    flexDirection: "row",
    borderRadius: 20,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-around",
  },
  //   },
  //   textInput: {
  //     // width: "250",
  //   },
});
