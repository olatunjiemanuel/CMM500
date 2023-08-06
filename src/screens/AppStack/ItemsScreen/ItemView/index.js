import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../../../../supabase-service";

// components import
import PageHeader from "../../../../components/PageHeader/index";
import { TouchableOpacity } from "react-native";

const ItemView = ({ navigation }) => {
  const route = useRoute();
  const itemId = route.params?.itemId;
  const [inventory, setInventory] = useState(null);

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

  return (
    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
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
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      {inventory ? (
        <View style={{ paddingHorizontal: 10 }}>
          <Text>{inventory[0]?.created_at}</Text>
          <Text>{inventory[0]?.userEmail}</Text>
          <Text>{inventory[0]?.Description}</Text>
          <Text>{inventory[0]?.Quantity}</Text>
          <Text>{inventory[0]?.Amount}</Text>
          <Text>{inventory[0]?.Price}</Text>
          <Text>{inventory[0]?.ImageUrl}</Text>
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

const styles = StyleSheet.create({});
