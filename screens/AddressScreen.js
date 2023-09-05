import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import ArrowIcon from "react-native-vector-icons/AntDesign";
import {
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartSlice from "../redux/cartSlice";

const AddressScreen = () => {
  const navigation = useNavigation();
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
  const [orderRef, setOrderRef] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const dispatch = useDispatch();

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

  //Validate the form before submission
  const validateForm = () => {
    let isValid = true;

    if (!name) {
      isValid = false;
      setNameError("Name is required");
      Alert.alert("Name is required!");
    } else {
      setNameError("");
    }

    if (!email) {
      isValid = false;
      setEmailError("Email is required");
      Alert.alert("Email is required!");
    } else {
      setEmailError("");
    }

    if (!/^\d{6}$/.test(pincode)) {
      isValid = false;
      setPincodeError("Pincode should not exceed 6 numbers!");
      Alert.alert("Pincode should not exceed 6 numbers!");
    } else {
      setPincodeError("");
    }

    return isValid;
  };

  //Creating a new order and saving to DB (post request).
  const onCreateOrder = async () => {
    if (validateForm()) {
      const result = await fetch(
        "https://nikeappbackend-production.up.railway.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            subtotal: subtotal,

            customer: {
              name: name,
              email: email,
              mobileNum: phoneNum,
              address: add1,
              pincode: pincode,
            },
          }),
        }
      );
      const resultBody = await result.json();
      setOrderRef(resultBody);
      const orderReference = orderRef?.data?.ref;

      if (result?.ok && orderReference) {
        // Store the order reference locally
        await AsyncStorage.setItem("orderReference", orderReference);
        Alert.alert(
          `Your Payment was Successful. Your order id is "${orderReference}"`
        );
        setTimeout(() => {
          navigation.navigate("HomeScreen");
        }, 500);
        dispatch(cartSlice.actions.clear());
      } else if (!result.ok) {
        Alert.alert("Something went wrong there...");
      }
    } else {
      Alert.alert("Make sure no required field left empty! ");
    }
  };

  // Default payment amount in cents (e.g., $10)

  const handlePayment = async () => {
    // Create a payment intent
    const response = await fetch(
      "https://nikeappbackend-production.up.railway.app/payments/intents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Math.floor(subtotal * 100) }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert("Something went wrong", errorData.message);
      return;
    }

    const responseBody = await response.json();

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
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }

    //4.If payment is ok create the order and save in DB.
    onCreateOrder();
  };

  return (
    <SafeAreaView>
      <ArrowIcon
        name="arrowleft"
        size={25}
        color="#000"
        style={{ margin: 10 }}
        onPress={navigation.goBack}
      />
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

      <TouchableOpacity style={styles.orderBtn} onPress={handlePayment}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
