import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ShoppingTotal = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.items);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.newItem.price * item.quantity,
    0
  );

  const onPressPlaceOrder = () => {
    navigation.navigate("AddressScreen", { subtotal });
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.subtotalText}>Subtotal : </Text>
          <Text style={styles.deliveryText}>Delivery : </Text>
          <Text style={styles.totalText}>Total : </Text>
        </View>

        <View>
          <Text style={styles.subtotalText}> ₹{subtotal}</Text>
          <Text style={styles.deliveryText}> {"₹50"}</Text>
          <Text style={styles.totalText}> ₹{subtotal + 50}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={onPressPlaceOrder}
          style={styles.checkoutBtn}
        >
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#c4c2c2",
    borderTopWidth: 1,
    marginTop: 3,
  },
  subtotalText: {
    fontSize: 20,
    color: "#6b6a69",
  },
  deliveryText: {
    fontSize: 20,
    color: "#6b6a69",
  },
  totalText: {
    fontSize: 20,
    color: "#6b6a69",
  },
  checkoutBtn: {
    padding: 16,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 6,
    width: "95%",
    position: "relative",
    marginTop: 6,
  },

  checkoutBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 21,
  },
});

export default ShoppingTotal;
