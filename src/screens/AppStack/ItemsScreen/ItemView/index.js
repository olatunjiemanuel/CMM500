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

  return (
    <View style={{ marginTop: 40 }}>
      {inventory ? (
        <View>
          <Button title="Go back" onPress={() => navigation.goBack()} />
          <Text>good view</Text>
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
