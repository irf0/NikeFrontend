import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BagIcon from "react-native-vector-icons/SimpleLineIcons";
import SearchIcon from "react-native-vector-icons/AntDesign";
import HomeIcon from "react-native-vector-icons/AntDesign";
import HeartIcon from "react-native-vector-icons/AntDesign";
import TruckIcon from "react-native-vector-icons/Feather";
import logo from "../assets/download.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { productSlice } from "../redux/productSlice";
import { getProducts } from "../apis/products";

const HomeScreen = () => {
  const [allProductsData, setAllProductsData] = useState([]);
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  //Fetch all the products from the server
  const fetchProductsData = async () => {
    const productsData = await getProducts();
    if (productsData) {
      setAllProductsData(productsData);
    } else {
      console.log("Error fetching products data");
    }
  };
  useEffect(() => {
    fetchProductsData();
  }, []);

  const handlePress = (itemId) => {
    dispatch(productSlice.actions.setSelectedProduct(allProductsData));
    navigation.navigate("ProductDetailScreen", { itemId });
  };

  const handleNav = () => {
    navigation.navigate("TrackOrderScreen");
  };

  return (
    <SafeAreaView>
      {/* Navbar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={logo} style={{ height: 50, width: 130 }} />
      </View>

      <FlatList
        data={allProductsData.data}
        style={{ marginBottom: 135 }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: "50%",
              padding: 1,
              margin: 3,
            }}
          >
            <TouchableOpacity onPress={() => handlePress(item._id)}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ marginHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <Text style={{ fontSize: 17, fontWeight: "600" }}>
                  $ {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />

      {/* Bottom Icons */}
      <View activeOpacity={0.9} style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <HomeIcon name="home" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <SearchIcon name="search1" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BagIcon
              name="bag"
              size={36}
              color="white"
              style={{ position: "absolute" }}
            />
            <Text style={styles.cartText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNav}>
          <TruckIcon name="truck" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <HeartIcon name="hearto" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 2,
    shadowColor: "gray",
    shadowOffset: 15,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  iconsContainer: {
    position: "absolute",
    padding: 20,
    bottom: 65,
    width: "98%",
    borderRadius: 6,
    backgroundColor: "black",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: -5,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default HomeScreen;
