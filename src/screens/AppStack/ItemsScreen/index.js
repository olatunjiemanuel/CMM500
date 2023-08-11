import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "../../../../supabase-service";
import { useUser } from "../../../../UserContext";
import { Camera } from "expo-camera";

// component imports
import SearchbarComponent from "../../../components/SearchbarComponent";
import RecentlyDisplayedComponent from "../../../components/RecentlyDisplayedComponent";
import FloatingButton from "../../../components/FloatingButton/index";
import FormComponent from "../../../components/FormComponent/index";
import ButtonComponent from "../../../components/ButtonComponent";
import DisplayInventriComponent from "../../../components/DisplayInventriComponent";
import FlatListFooter from "../../../components/FlatLitstFooter";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ItemsScreen = () => {
  const [modalView, setModalView] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [searching, setSeaching] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [mostRecentSearch, setMostRecentSearch] = useState([]);
  const [hasPermission, setHasPermission] = useState("granted");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const inputRef = useRef(null);
  const [inventory, setInventory] = useState(null);
  const { userEmail } = useUser();

  // form states
  const [itemName, setItemName] = useState(null);
  const [itemDesc, setItemDesc] = useState(null);
  const [itemQty, setItemQty] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  const navigation = useNavigation();

  // camrea reference
  const cameraRef = useRef(null);

  // Camera function
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No Access to Camera</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      console.log("taking picture");
      try {
        let picture = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quanlity: 1,
        });
        return picture;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [])
  );

  const handleSubmit = () => {
    setMostRecentSearch([searchText, ...mostRecentSearch]);
    setSeaching(false);
    Search();
  };

  const Search = async () => {
    try {
      const { data, error } = await supabase
        .from("Inventory")
        .select()
        .eq("userEmail", userEmail)
        .ilike("Name", `%${searchText}%`);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        // Alert.alert("Success");
        console.log(data);
        setInventory(data);
        // setInventory(data);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const retrieveData = async () => {
    try {
      const { data, error } = await supabase
        .from("Inventory")
        .select()
        .eq("userEmail", userEmail)
        .order("created_at", { ascending: false });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        // Alert.alert("Success");
        // console.log(data);
        setInventory(data);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const addTest = async () => {
    try {
      const { error } = await supabase.from("Inventory").insert({
        // id: 2,
        Name: itemName,
        Description: itemDesc,
        Quantity: itemQty,
        Amount: itemPrice,
        Price: itemPrice,
        userEmail: userEmail,
      });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setModalView(false);
        Alert.alert("Success");
        retrieveData();
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
            <ScrollView enableOnAndroid={true}>
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
              <Button
                title="Add Image"
                onPress={() => {
                  setModalView(false);
                  setCameraModal(true);
                }}
              />
              <View style={{ marginHorizontal: 30 }}>
                <ButtonComponent
                  bgColour="#008000"
                  onPress={() => {
                    addTest();
                    retrieveData();
                  }}
                  ButtonText="Save"
                  textColour="#fff"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={cameraModal} animationType="slide" transparent={true}>
        <View style={{ backgroundColor: "rgba(143, 141, 141, 0.8)", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
              // marginHorizontal: 20,
              marginVertical: Platform.OS === "android" ? 30 : 60,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity style={{ marginLeft: 300, marginBottom: 10 }}>
              <AntDesign
                name="close"
                size={24}
                color="#000"
                onPress={() => {
                  setCameraModal(false);
                  setModalView(true);
                }}
              />
            </TouchableOpacity>
            <Camera type={type} style={styles.camera} ref={cameraRef}></Camera>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={30}
                  color="grey"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "grey",
                  marginLeft: 20,
                }}
                onPress={async () => {
                  const photo = await takePhoto();
                  Alert.alert("photo taken", JSON.stringify(photo));
                }}
              ></TouchableOpacity>
            </View>
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
          <ScrollView enableOnAndroid style={styles.recentSearchContainer}>
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
        <View style={styles.itemsDisplayCntnr}>
          {inventory ? (
            <View>
              <View
                style={{
                  paddingVertical: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 35, fontWeight: "bold" }}>
                  Inventory
                </Text>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: "#008000",
                  }}
                  onPress={() => {
                    setSearchText(null);
                    retrieveData();
                  }}
                >
                  <Text style={{ color: "#fff" }}>Clear Filters</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                // pagingEnabled
                data={inventory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <DisplayInventriComponent
                    onPress={() =>
                      navigation.navigate("ItemView", { itemId: item.id })
                    }
                    itemName={item.Name}
                    quantity={item.Quantity}
                  />
                )}
                ListFooterComponent={() => <FlatListFooter />}
              />
              {/* <DisplayInventriComponent /> */}
              <Button
                title="Run test"
                // onPress={() => {
                //   addTest();
                // }}
              />
            </View>
          ) : (
            <ActivityIndicator size="large" color="#000" />
          )}
        </View>
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
  itemsDisplayCntnr: {},
  flex: 1,
  // imaageCntnr: {
  //   backgroundColor: "red",
  // },
  camera: {
    height: 550,
  },
});
