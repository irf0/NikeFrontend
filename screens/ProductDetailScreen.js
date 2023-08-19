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
import products from "../data/products";
import Icon from "react-native-vector-icons/AntDesign";

const ProductDetailScreen = () => {
  // const route = useRoute();
  // const { product } = route.params;
  const navigation = useNavigation();
  const product = products[0];
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: "relative", marginBottom: 70 }}
      >
        <Icon
          name="arrowleft"
          size={25}
          color="#000"
          style={{ margin: 10 }}
          onPress={navigation.goBack}
        />

        {/* Image Carousel */}
        <FlatList
          data={product.images}
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
            {product.name}
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
            ${product.price}
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
            {product.description}
          </Text>
        </View>
      </ScrollView>
      {/* Checkout Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          position: "absolute",
          padding: 20,
          bottom: 3,
          width: "90%",
          borderRadius: 10,
          backgroundColor: "red",
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
