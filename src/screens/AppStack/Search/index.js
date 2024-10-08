import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";

// component imports
import SearchbarComponent from "../../../components/SearchbarComponent";
import RecentlyDisplayedComponent from "../../../components/RecentlyDisplayedComponent";

const SearchScreen = () => {
  const [searching, setSeaching] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [mostRecentSearch, setMostRecentSearch] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    setMostRecentSearch([searchText, ...mostRecentSearch]);
    setSeaching(false);
  };
  return (
    <View style={styles.mainCntnr}>
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
        <ScrollView style={styles.recommendationCntnr}>
          <View>
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
          </View>
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
          <View>
            <Text style={[styles.recentSearchTxt, { fontSize: 35 }]}>
              Popular on Pinterest
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;

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
  recommendationCntnr: {
    marginTop: 40,
  },
  // imaageCntnr: {
  //   backgroundColor: "red",
  // },
});
