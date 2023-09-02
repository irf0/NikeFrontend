import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import PlusIcon from "react-native-vector-icons/EvilIcons";
import MinusIcon from "react-native-vector-icons/EvilIcons";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../redux/cartSlice";

const CartItemList = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseQty = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };
  const handleDecreaseQty = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.newItem.image }}
          height={120}
          width={120}
          style={{ borderRadius: 10 }}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.newItem.name}</Text>
          <Text style={styles.price}>
            ${item.newItem.price * item.quantity}
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleDecreaseQty(item.newItem._id)}
            >
              <MinusIcon name="minus" size={32} />
            </TouchableOpacity>

            <Text style={{ fontSize: 18 }}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => handleIncreaseQty(item.newItem._id)}
            >
              <PlusIcon name="plus" size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.1,
    borderRadius: 3,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 6,
    padding: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    marginHorizontal: 6,
  },
  quantityContainer: {
    flexDirection: "row",
    marginTop: 6,
    marginLeft: -3,
    color: "#6b6a69",
  },
  name: {
    fontSize: 25,
    fontWeight: "600",
    color: "#4a4949",
  },
  price: {
    fontSize: 20,
    fontWeight: "400",
    color: "#4a4949",
  },
});

export default CartItemList;
