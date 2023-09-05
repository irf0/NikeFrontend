import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import BagIcon from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { getProduct } from "../apis/products";

const ProductDetailScreen = () => {
  const [oneProduct, setOneProduct] = useState([]);
  const route = useRoute();
  const id = route.params.itemId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const { width } = useWindowDimensions();

  //Fetch one specific product from the server
  const fetchProductInfo = async () => {
    const productInfoData = await getProduct(id);
    if (productInfoData) {
      setOneProduct(productInfoData.data);
    } else {
      console.log("Error fetching products data");
    }
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const handleAddToCart = (productId) => {
    dispatch(addItemToCart(productId));
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: "relative", marginBottom: 70 }}
      >
        {/* Header in Product Detail Screen */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Icon
            name="arrowleft"
            size={25}
            color="#000"
            style={{ margin: 10 }}
            onPress={navigation.goBack}
          />

          <BagIcon
            name="bag"
            size={30}
            color="#000"
            style={{
              position: "absolute",
              right: 10,
              marginBottom: -7,
            }}
            onPress={() => navigation.navigate("CartScreen")}
          />
          <Text
            style={{
              fontSize: 16,
              position: "absolute",
              right: 20,
              marginTop: 7,
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {cart.length}
          </Text>
        </View>

        {/* Image Carousel */}
        <FlatList
          data={oneProduct.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: width, aspectRatio: 1 }}
            />
          )}
          horizontal
          pagingEnabled
        />

        <View style={{ padding: 10, position: "relative" }}>
          {/* Title */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              marginTop: 25,
              marginLeft: 20,
            }}
          >
            {oneProduct.name}
          </Text>

          {/* Price */}
          <Text
            style={{
              fontSize: 21,
              fontWeight: "600",
              marginTop: 5,
              marginLeft: 20,
            }}
          >
            ₹{oneProduct.price}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: 17,
              marginTop: 5,
              marginLeft: 20,
              lineHeight: 28,
              flexWrap: "wrap",
            }}
          >
            {oneProduct.description}
          </Text>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity
        onPress={() => handleAddToCart(oneProduct)}
        activeOpacity={0.9}
        style={{
          position: "absolute",
          padding: 12,
          bottom: 3,
          width: "90%",
          borderRadius: 10,
          backgroundColor: "black",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          ADD TO CART
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
