import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@env";

const AddressScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const route = useRoute();
  const subtotal = route.params.subtotal;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [pincode, setPincode] = useState("");

  let razorpayId = RAZORPAY_KEY_ID;
  let razorpaySecret = RAZORPAY_KEY_SECRET;

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNum(text);
  };

  const handleAddressChange1 = (text) => {
    setAdd1(text);
  };
  const handleAddressChange2 = (text) => {
    setAdd2(text);
  };
  const handlePinCodeChange = (text) => {
    setPincode(text);
  };

  let options = {
    description: "Buy Nike App",
    image: "https://i.imgur.com/3g7nmJC.jpg",
    currency: "INR",
    key: "rzp_test_TJWo5vFdtHOs3i",
    amount: subtotal * 100,
    name: "Nike",
    order_id: "",
    prefill: {
      email: "gaurav.kumar@example.com",
      contact: "9191919191",
      name: "Gaurav Kumar",
    },
    theme: { color: "#53a20e" },
  };
  const handlePayment = () => {
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.pageHeader}>Add Your Name and Address</Text>
        <TextInput
          placeholder="Full Name *"
          onChangeText={handleNameChange}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Email *"
          onChangeText={handleEmailChange}
          value={email}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile No.(optional)"
          onChangeText={handlePhoneNumberChange}
          value={phoneNum}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Address 1 *"
          onChangeText={handleAddressChange1}
          value={add1}
          style={styles.input}
        />
        <TextInput
          placeholder="Address 2 (optional)"
          onChangeText={handleAddressChange2}
          value={add2}
          style={styles.input}
        />
        <TextInput
          placeholder="Pin Code *"
          onChangeText={handlePinCodeChange}
          value={pincode}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.orderBtn} onPress={() => handlePayment()}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 16,
  },

  pageHeader: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  orderBtn: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    padding: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AddressScreen;
