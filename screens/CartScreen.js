import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CartItemList from "../components/CartItemList";
import ShoppingTotal from "../components/ShoppingTotal";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Icon
          name="arrowleft"
          size={25}
          color="#000"
          style={{ margin: 10 }}
          onPress={navigation.goBack}
        />
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 19 }}>
          Cart Summary
        </Text>

        <View style={{ marginRight: 4 }}>
          <Text style={{ fontWeight: "bold" }}>
            Items in Cart : {cartItems.length}
          </Text>
        </View>
      </View>

      <View>
        <FlatList
          style={{ marginBottom: 100 }}
          data={cartItems}
          renderItem={({ item }) => <CartItemList item={item} />}
          ListFooterComponent={ShoppingTotal}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
