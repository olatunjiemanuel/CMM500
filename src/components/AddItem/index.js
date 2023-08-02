import { StyleSheet, Text, View, Modal, Button } from "react-native";
import React, { useState } from "react";

const AddItem = (props) => {
  const [modalView, setModalView] = useState({ check });
  return (
    <Modal visible={modalView}>
      <View style={{ backgroundColor: "red", flex: 1, marginTop: 40 }}>
        <Button
          title="Close"
          onPress={() => {
            setModalView(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
