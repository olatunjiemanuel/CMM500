import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Platform,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../../../../supabase-service";
import { AntDesign } from "@expo/vector-icons";

// components import
import PageHeader from "../../../../components/PageHeader/index";
import FormComponent from "../../../../components/FormComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

const ItemView = ({ navigation }) => {
  const route = useRoute();
  const itemId = route.params?.itemId;
  const [inventory, setInventory] = useState(null);
  const [deleteModal, setDeleteModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [Name, setName] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Quantity, setQuantity] = useState(null);
  const [Price, setPrice] = useState(null);

  //   console.log(itemId);

  const retrievInventory = async () => {
    try {
      const { data, error } = await supabase
        .from("Inventory")
        .select()
        .eq("id", itemId);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        // Alert.alert("Success");
        // console.log(data);
        setInventory(data);
        console.log(inventory);
        // setInventory(data);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const deleteItem = async () => {
    try {
      const { error } = await supabase
        .from("Inventory")
        .delete()
        .eq("id", inventory[0]?.id);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Item deleted");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const SaveEdit = async () => {
    try {
      const { error } = await supabase
        .from("Inventory")
        .update({
          Name: Name,
          Description: Description,
          Quantity: Quantity,
          Price: Price,
        })
        .eq("id", inventory[0]?.id);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Item deleted");
        navigation.goBack();
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

  useEffect(() => {
    retrievInventory();
  }, []);

  useEffect(() => {
    console.log(inventory);
    // console.log(inventory[0]);
  }, [inventory]);

  const getEditData = () => {
    if (inventory) {
      setName(inventory[0]?.Name);
      setDescription(inventory[0]?.Description);
      setQuantity(String(inventory[0]?.Quantity));
      setPrice(String(inventory[0]?.Price));
    }
  };

  useEffect(() => {
    getEditData();
  }, [inventory]);

  return (
    <View style={styles.mainCntnr}>
      <Modal visible={deleteModal} transparent animationType="fade">
        <View style={styles.modalCntnr}>
          <View style={styles.modalSubCntnr}>
            <TouchableOpacity style={styles.closeBtnCntnr}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => {
                  setDeleteModalVisible(false);
                }}
              />
            </TouchableOpacity>
            <Text style={styles.modalTxtCntnr}>
              Are you sure you want to delete{" "}
              {inventory ? inventory[0]?.Name : ""} ?
            </Text>
            <TouchableOpacity
              style={[styles.deleteBtn, { marginHorizontal: 20 }]}
              onPress={() => {
                deleteItem();
                setDeleteModalVisible(false);
              }}
            >
              <Text style={styles.deleteText}>Yes, delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={editModal} transparent animationType="slide">
        <View style={styles.modalCntnr}>
          <View style={styles.editModalSubCntnr}>
            <View style={styles.editModalTitleCntnr}>
              <Text style={styles.editModalTitleText}>Edit Item</Text>
              <TouchableOpacity style={styles.closeBtnCntnr}>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  onPress={() => {
                    setEditModal(false);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.formsCntnr}>
              <FormComponent
                formName="Name"
                value={Name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
            <View style={styles.formsCntnr}>
              <FormComponent
                formName="Description"
                value={Description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
            </View>
            <View style={styles.formsCntnr}>
              <FormComponent
                formName="Quantity"
                value={Quantity}
                onChangeText={(text) => {
                  setQuantity(text);
                }}
              />
            </View>
            <View style={styles.formsCntnr}>
              <FormComponent
                formName="Price"
                value={Price}
                onChangeText={(text) => {
                  setPrice(text);
                }}
              />
            </View>
            <View style={{ marginTop: 60 }}>
              <ButtonComponent
                bgColour="#008000"
                ButtonText="Save"
                textColour="#fff"
              />
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageHeader
          headerText={inventory ? inventory[0]?.Name : ""}
          onPress={() => navigation.goBack()}
          TextColour="#000"
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            getEditData();
            setEditModal(true);
          }}
        >
          <Text style={styles.editButtonText}>Edit item</Text>
        </TouchableOpacity>
      </View>
      {inventory ? (
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.ImgCntnr}></View>
          <View style={styles.idAndBtnCntnr}>
            <View style={{ marginRight: 50, alignItems: "center" }}>
              <Text style={styles.titleTxt}>Item ID</Text>
              <Text style={styles.mainTxt}>{inventory[0]?.id}</Text>
            </View>
            <View>
              <Text style={styles.titleTxt}>Last Updated at</Text>
              <Text style={styles.mainTxt}>
                {inventory[0]?.created_at.slice(0, 10)}
                {"    "}
                {inventory[0]?.created_at.slice(11, 16)}
              </Text>
            </View>
          </View>

          {/* <Text>{inventory[0]?.userEmail}</Text> */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.titleTxt}>Description</Text>
            <View style={styles.descCntnr}>
              <Text>{inventory[0]?.Description}</Text>
            </View>
          </View>
          <View style={styles.qtyAndPriceCntnr}>
            <View style={{ marginRight: 50 }}>
              <Text style={styles.titleTxt}>Price(GBP)</Text>
              <Text style={styles.mainTxt}>{inventory[0]?.Price}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.titleTxt}>Amount in stock</Text>
              <Text style={styles.mainTxt}>{inventory[0]?.Quantity}</Text>
            </View>
            <View style={{ marginLeft: 40 }}>
              <Text style={styles.titleTxt}>Value(GBP)</Text>
              <Text style={styles.mainTxt}>
                {inventory[0]?.Price * inventory[0]?.Quantity}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              setDeleteModalVisible(true);
            }}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          {/* <Text>{inventory[0]?.Quantity}</Text>
          <Text>{inventory[0]?.Amount}</Text>
          <Text>{inventory[0]?.Price}</Text>
          <Text>{inventory[0]?.ImageUrl}</Text> */}
        </View>
      ) : (
        Loading()
      )}

      {/* <Text>View Items page</Text>
      <Text>{itemId}</Text> */}
    </View>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  mainCntnr: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 50,
  },
  editButton: {
    backgroundColor: "#008000",
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
  },
  ImgCntnr: {
    paddingHorizontal: 20,
    height: 200,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  idAndBtnCntnr: {
    flexDirection: "row",
    marginTop: 20,
    // justifyContent: "space-between",
  },
  titleTxt: { color: "grey", marginBottom: 5 },
  mainTxt: { fontWeight: "bold" },
  descCntnr: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  qtyAndPriceCntnr: {
    flexDirection: "row",
    marginTop: 20,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalCntnr: {
    backgroundColor: "rgba(143, 141, 141, 0.8)",
    flex: 1,
  },
  modalSubCntnr: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 300,
    padding: 20,
  },
  editModalSubCntnr: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 50,
    padding: 20,
  },
  editModalTitleCntnr: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  editModalTitleText: {
    fontSize: 20,
    fontWeight: "700",
  },
  formsCntnr: {
    marginTop: 20,
  },

  //   closeBtnCntnr: {
  //     alignSelf: "flex-end",
  //   },
  modalTxtCntnr: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
  },
});
