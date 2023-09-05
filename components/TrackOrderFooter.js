import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TrackOrderFooter = ({ deliveryDetails }) => {
  console.log(deliveryDetails.subtotal);
  return (
    <View style={styles.container}>
      <View style={styles.deliveryDetailsContainer}>
        <Text style={styles.deliveryText}>Delivery</Text>
        <Text style={styles.name}>{deliveryDetails.customer.name}</Text>
        <Text style={styles.address}>
          {deliveryDetails.customer.address} -{deliveryDetails.customer.pincode}
        </Text>
      </View>
      <View>
        <Text style={styles.subtotalText}>Subtotal</Text>
        <Text style={styles.subtotalAmt}>₹{deliveryDetails.subtotal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: "gray",
    borderTopWidth: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deliveryText: {
    fontSize: 20,
    fontWeight: "600",
  },
  deliveryDetailsContainer: {
    marginLeft: 16,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
  },
  email: {
    fontSize: 16,
  },
  address: {
    fontSize: 16,
  },
  subtotalText: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 15,
  },
  subtotalAmt: {
    fontSize: 18,
    fontWeight: "700",
  },
});
export default TrackOrderFooter;
