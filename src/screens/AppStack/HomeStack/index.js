import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../../../supabase-service";
import { useUser } from "../../../../UserContext";

// component Imports
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ButtonComponent from "../../../components/ButtonComponent/index";

// logic imports
import GeneratePDF from "../../../Logic/generatePDF/index.tsx";

const HomeStack = () => {
  const navigation = useNavigation();
  const [totalItems, setTotalItems] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [TotalValue, setTotalValue] = useState(null);
  const [catalogueData, setCatalogueData] = useState(null);
  const [loading, setLoading] = useState(null);

  const { userEmail } = useUser();

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const retrievCatalogueData = async () => {
    try {
      const { data, error } = await supabase
        .from("Inventory")
        .select()
        .eq("userEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setCatalogueData(data);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const retrieveData = async () => {
    try {
      const { count, error } = await supabase
        .from("Inventory")
        .select("*", { count: "exact", head: true })
        .eq("userEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setTotalItems(count);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const retrievePrice = async () => {
    try {
      const { data, error } = await supabase
        .from("Inventory")
        .select("Price")
        .eq("userEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        const prices = data.map((item) => item.Price); // Extract prices into an array
        const sum = prices.reduce((total, price) => total + price, 0); // Calculate the sum
        setTotalValue(sum);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  const retriveQuantity = async () => {
    try {
      const { data, error } = await supabase
        .from("Inventory")
        .select("Quantity")
        .eq("userEmail", userEmail);
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        const TotalQuantity = data.map((item) => item.Quantity); // Extract prices into an array
        const sum = TotalQuantity.reduce(
          (total, TotalQuantity) => total + TotalQuantity,
          0
        ); // Calculate the sum
        // console.log("Quantity Total:", sum);
        setTotalQuantity(sum);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    retrieveData();
    retrievePrice();
    retriveQuantity();
    retrievCatalogueData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
      retrievePrice();
      retriveQuantity();
      retrievCatalogueData();
    }, [])
  );
  return (
    <View style={styles.mainCntnr}>
      <View style={styles.pageHeaderCntnr}>
        <Text style={styles.pageHeaderText}>Home</Text>
      </View>
      <View style={styles.inventorySummaryCntnr}>
        <View style={styles.summaryHeaderCntnr}>
          <MaterialIcons name="inventory" size={24} color="#008000" />
          <Text style={styles.summaryHeaderTxt}>Inventory summary</Text>
        </View>
        <View style={styles.summaryCntnr}>
          <View>
            <Text style={styles.summaryTitleTxt}>Items</Text>
            <Text style={styles.summarySubTxt}>
              {totalItems ? totalItems : "-"}
            </Text>
          </View>
          <View>
            <Text style={styles.summaryTitleTxt}>Total Qty</Text>
            <Text style={styles.summarySubTxt}>
              {totalQuantity ? totalQuantity : "-"}
            </Text>
          </View>
          <View>
            <Text style={styles.summaryTitleTxt}>Total Value</Text>
            <Text style={styles.summarySubTxt}>
              £ {TotalValue ? TotalValue : "-"}
            </Text>
          </View>
        </View>
        <View style={styles.buttonCntnr}>
          <ButtonComponent
            bgColour="#008000"
            onPress={() => {
              setLoading(true);
              GeneratePDF(catalogueData);
              // generatePDF();
              setLoading(false);
            }}
            ButtonText={loading ? "Creating catalogue" : "Create catalogue"}
            textColour="#fff"
          />
        </View>
      </View>
      <View style={styles.inventorySummaryCntnr}>
        <View style={styles.summaryHeaderCntnr}>
          <FontAwesome name="calendar-o" size={24} color="#008000" />
          <Text style={styles.summaryHeaderTxt}>This Month</Text>
        </View>
        <View style={styles.monthTextCntnr}>
          <Text style={styles.monthText}>
            You can see sales, incoming and outgoing data for the month here
            when the POS service is launched !
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  mainCntnr: {
    marginHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 30 : 50,
  },
  pageHeaderCntnr: {
    marginTop: 40,
  },
  pageHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subHeaderText: {},
  inventorySummaryCntnr: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  summaryHeaderCntnr: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryHeaderTxt: {
    marginLeft: 10,
  },
  summaryCntnr: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  summaryTitleTxt: {
    color: "grey",
  },
  summarySubTxt: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: "500",
  },
  monthTextCntnr: { marginTop: 10, padding: 10 },
  monthText: { color: "grey", fontSize: 15 },
  buttonCntnr: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
