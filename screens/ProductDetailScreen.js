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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import BagIcon from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

const ProductDetailScreen = () => {
  const route = useRoute();
  const id = route.params.itemId;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products.selectedProduct);
  const cart = useSelector((state) => state.cart.items);
  const { width } = useWindowDimensions();

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

          <View style={{ flexDirection: "row" }}>
            <BagIcon
              name="bag"
              size={30}
              color="#000"
              onPress={() => navigation.navigate("CartScreen")}
              style={{
                position: "absolute",
                marginLeft: -35,
                alignItems: "center",
              }}
            />
            <Text
              style={{
                position: "relative",
                fontSize: 16,
                alignSelf: "center",
                marginTop: -7,
                marginLeft: -25,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {cart.length}
            </Text>
          </View>
        </View>

        {/* Image Carousel */}
        <FlatList
          data={productState.images}
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
            {productState.name}
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
            ${productState.price}
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
            {productState.description}
          </Text>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity
        onPress={() => handleAddToCart(id)}
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
