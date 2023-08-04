import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "../../../../supabase-service";

// component imports
import SearchbarComponent from "../../../components/SearchbarComponent";
import RecentlyDisplayedComponent from "../../../components/RecentlyDisplayedComponent";
import FloatingButton from "../../../components/FloatingButton/index";
import FormComponent from "../../../components/FormComponent/index";
import ButtonComponent from "../../../components/ButtonComponent";
import DisplayInventriComponent from "../../../components/DisplayInventriComponent";

const ItemsScreen = () => {
  const [modalView, setModalView] = useState(false);
  const [searching, setSeaching] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [mostRecentSearch, setMostRecentSearch] = useState([]);
  const inputRef = useRef(null);

  // form states
  const [itemName, setItemName] = useState(null);
  const [itemDesc, setItemDesc] = useState(null);
  const [itemQty, setItemQty] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  const handleSubmit = () => {
    setMostRecentSearch([searchText, ...mostRecentSearch]);
    setSeaching(false);
  };

  // const test = "Tunji";

  const retrieveData = async () => {
    try {
      const { data, error } = await supabase.from("Inventory").select();
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success");
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const addTest = async () => {
    try {
      const { error } = await supabase.from("Inventory").insert({
        // id: 2,
        Name: itemName,
        Description: itemDesc,
        Quantity: itemQty,
        Amount: itemPrice,
        Price: itemPrice,
      });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setModalView(false);
        Alert.alert("Success");
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View style={styles.mainCntnr}>
      <Modal visible={modalView} animationType="slide" transparent={true}>
        <View style={{ backgroundColor: "rgba(143, 141, 141, 0.8)", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 60,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  onPress={() => {
                    setModalView(false);
                  }}
                />
              </TouchableOpacity>
              <Text>New item</Text>
              <TouchableOpacity>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View>
                <FormComponent
                  formName="Item name"
                  placeHolder="Please enter item name"
                  //  onFocus
                  //  borderColor
                  //  color
                  value={itemName}
                  onChangeText={(text) => setItemName(text)}
                />
              </View>
              <View>
                <FormComponent
                  formName="Item description"
                  placeHolder="Please enter item description"
                  //  onFocus
                  //  borderColor
                  //  color
                  value={itemDesc}
                  onChangeText={(text) => setItemDesc(text)}
                />
              </View>
              <View>
                <FormComponent
                  formName="Item ID"
                  placeHolder="Please enter item ID, leave empty if N/A"
                  //  onFocus
                  //  borderColor
                  //  color
                  //  value
                  //  onChangeText
                />
              </View>
              <View>
                <FormComponent
                  formName="Item quantity"
                  placeHolder="Please enter item qantity"
                  //  onFocus
                  //  borderColor
                  //  color
                  value={itemQty}
                  onChangeText={(text) => setItemQty(text)}
                />
              </View>
              <View>
                <FormComponent
                  formName="Item price"
                  placeHolder="Please enter item price"
                  //  onFocus
                  //  borderColor
                  //  color
                  value={itemPrice}
                  onChangeText={(text) => setItemPrice(text)}
                />
              </View>
              <Button title="Add Image" />
              <View style={{ marginHorizontal: 30 }}>
                <ButtonComponent
                  bgColour="#008000"
                  onPress={() => addTest()}
                  ButtonText="Save"
                  textColour="#fff"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View
        style={{
          position: "absolute",
          marginLeft: 250,
          marginTop: 600,
          zIndex: 1,
        }}
      >
        <FloatingButton
          onPress={() => {
            setModalView(true);
          }}
        />
      </View>
      <View style={styles.searchCntnr}>
        <View>
          <SearchbarComponent
            placeholder="... Search"
            onFocus={() => {
              setSeaching(true);
            }}
            onChangeText={(value) => {
              setSearchText(value);
            }}
            onSubmitEditing={() => {
              handleSubmit();
            }}
            value={searchText}
            ref={inputRef}
            width={searching ? 250 : 300}
          />
        </View>
        {searching ? (
          <TouchableOpacity
            style={styles.cancelButtonCntnr}
            onPress={() => {
              setSeaching(false);
              inputRef.current.blur();
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {searching ? (
        <View>
          <View style={styles.recentSearchTxtContainer}>
            <Text style={styles.recentSearchTxt}>Recently Searched</Text>
          </View>
          <ScrollView style={styles.recentSearchContainer}>
            {mostRecentSearch.map((item) => (
              <RecentlyDisplayedComponent
                text={item}
                onPress={() => {
                  setSearchText(item);
                  handleSubmit();
                  inputRef.current.blur();
                }}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <ScrollView style={styles.itemsDisplayCntnr}>
          <View>
            <DisplayInventriComponent />
            <Text>No items yet</Text>
            <Button
              title="Run test"
              onPress={() => {
                addTest();
              }}
            />
            <Button
              title="Retrieve test"
              onPress={() => {
                retrieveData();
              }}
            />
          </View>

          {/* <View>
            <Text style={[styles.recentSearchTxt, { fontSize: 35 }]}>
              Recommendations
            </Text>
          </View>
          <View style={styles.imaageCntnr}>
            <Image
              style={{ width: 330, height: 150 }}
              source={require("../../../../assets/Images/technology.jpg")}
            />
            <View
              style={{
                backgroundColor: "green",
                width: 330,
                heigth: 150,
                position: "absolute",
                flex: 1,
              }}
            >
              <Text>Tunji</Text>
            </View>
          </View> */}
          {/* <View>
            <Image
              style={{ width: 330, height: 150 }}
              source={require("../../Images/Recommendations/Design.jpg")}
            />
          </View>
          <View>
            <Image
              style={{ width: 330, height: 150 }}
              source={require("../../Images/Recommendations/Art.jpg")}
            />
          </View> */}
          {/* <View>
            <Text style={[styles.recentSearchTxt, { fontSize: 35 }]}>
              Popular on Pinterest
            </Text>
          </View> */}
        </ScrollView>
      )}
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  mainCntnr: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 60,
    marginHorizontal: 20,
  },
  searchCntnr: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButtonCntnr: {
    paddingLeft: 10,
  },
  recentSearchContainer: {},
  recentSearchTxtContainer: {
    paddingVertical: 10,
    paddingLeft: 5,
  },
  recentSearchTxt: {
    fontSize: 30,
    fontWeight: 500,
    color: "grey",
  },
  itemsDisplayCntnr: {
    marginTop: 40,
  },
  // imaageCntnr: {
  //   backgroundColor: "red",
  // },
});
