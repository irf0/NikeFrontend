import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import {
  CardField,
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import RazorpayCheckout from "react-native-razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@env";

const AddressScreen = () => {
  const { confirmPayment } = useStripe();
  const [amount, setAmount] = useState(1000);
  const cartItems = useSelector((state) => state.cart.items);
  const route = useRoute();
  const subtotal = route.params.subtotal;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [pincode, setPincode] = useState("");

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

  // Default payment amount in cents (e.g., $10)

  const handlePayment = async () => {
    // Create a payment intent
    const response = await fetch("http://192.168.43.25:3000/payments/intents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Math.floor(subtotal * 100) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert("Something went wrong", errorData.message);
      return;
    }

    const responseBody = await response.json();
    console.log(responseBody);

    // 2. Initialize the Payment sheet
    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: responseBody.paymentIntent,
    });
    if (paymentSheetError) {
      Alert.alert("Something went wrong", paymentSheetError.message);
      return;
    }

    //3.Present the payment sheet
    await presentPaymentSheet();

    //4.If payment is ok create the order and save in DB.
    onCreateOrder();
  };

  const onCreateOrder = async () => {
    const result = await fetch("http://192.168.43.25:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        subtotal,

        customer: {
          name: name,
          email: email,
          mobileNum: phoneNum,
          address: add1,
          pincode: pincode,
        },
      }),
    });
    const resultBody = await result.json();

    if (result?.ok) {
      Alert.alert(
        "Order has been submitted",
        `Your order reference is "${resultBody.data.ref}"`
      );
      console.log(resultBody.data);
    } else if (!result.ok) {
      Alert.alert("Something went wrong there...");
    }
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

      <View></View>

      <TouchableOpacity style={styles.orderBtn} onPress={handlePayment}>
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
