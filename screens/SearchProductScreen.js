import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "react-native-vector-icons/AntDesign";
import { searchProducts } from "../apis/search";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";

const SearchProductScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showProductsContainer, setShowProductsContainer] = useState(false);
  const navigation = useNavigation();

  const queryProducts = async () => {
    setIsLoading(true);
    if (searchTerm.trim() === "") {
      setShowProductsContainer(false);
      setIsLoading(false);
      Alert.alert("Please Enter a value");
      return;
    }
    const searchResult = await searchProducts(searchTerm);
    if (searchResult) {
      setProductsData(searchResult);
      setShowProductsContainer(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setShowProductsContainer(true);
      setShowErrorMsg(true);
      setIsLoading(false);
    }
  };

  const searchTermInput = (text) => {
    setSearchTerm(text);
  };
  const navProductDetailScreen = (itemId) => {
    navigation.navigate("ProductDetailScreen", { itemId });
  };

  const itemsData = productsData?.data;

  return (
    <SafeAreaView>
      <View styles={{ flexDirection: "row" }}>
        <Icon
          name="arrowleft"
          size={25}
          color="#000"
          style={{ margin: 10 }}
          onPress={navigation.goBack}
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          onChangeText={searchTermInput}
          onSubmitEditing={queryProducts}
          returnKeyType="search"
          value={searchTerm}
        />
        <SearchIcon
          name="search1"
          size={25}
          color="black"
          style={styles.searchIcon}
          onPress={queryProducts}
        />
      </View>

      {showProductsContainer && (
        <View style={styles.searchResultsContainer}>
          {productsData && (
            <FlatList
              data={itemsData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navProductDetailScreen(item._id)}
                >
                  <View style={styles.resultsContainer}>
                    <Image
                      source={{ uri: item.image }}
                      height={50}
                      width={50}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          {itemsData?.length === 0 && (
            <View>
              <Text style={styles.errorMsgText}>Sorry No Product Found.😐</Text>
            </View>
          )}

          {isLoading && <ActivityIndicator size="medium" color="#000" />}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    marginLeft: 5,
    marginRight: 16,
    width: "95%",
    position: "absolute",
    borderRadius: 6,
  },
  searchIcon: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    alignSelf: "flex-end",
    position: "relative",
  },
  searchResultsContainer: {
    width: "95%",
    height: "auto",
    padding: 20,
    margin: 10,
    marginLeft: 5,
    marginRight: 16,
    marginTop: 12,
    borderColor: "gray",
    borderWidth: 0.5,
    shadowColor: "black",
    shadowOffset: { width: 100, height: 120 },
    shadowOpacity: 2,
    shadowRadius: 40,
  },
  resultsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
  },
  errorMsgText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
export default SearchProductScreen;
