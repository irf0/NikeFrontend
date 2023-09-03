import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserIcon from "react-native-vector-icons/EvilIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [orderReference, setOrderReference] = useState("");
  useEffect(() => {
    // Retrieve the order reference from AsyncStorage
    AsyncStorage.getItem("orderReference")
      .then((value) => {
        if (value) {
          setOrderReference(value);
        } else {
          // Handle the case where the order reference is not found in AsyncStorage
          Alert.alert("Order reference not found.");
        }
      })
      .catch((error) => {
        console.error("Error retrieving order reference:", error);
      });
  }, []);

  const orderRefSend = () => {
    navigation.navigate("TrackOrderScreen", { orderReference });
  };
  return (
    <SafeAreaView>
      <Icon
        name="arrowleft"
        size={25}
        color="#000"
        style={{ margin: 10 }}
        onPress={navigation.goBack}
      />
      <View style={styles.userContainer}>
        <UserIcon style={styles.userIcon} name="user" size={100} color="gray" />
        <Text style={styles.userName}>Your Name</Text>
      </View>
      <View>
        <Text style={styles.orderHeaderText}>Your Recent Orders</Text>
        <View style={styles.orderRefContainer}>
          <Text style={styles.orderRefText}>{orderReference}</Text>
          <TouchableOpacity style={styles.Button} onPress={orderRefSend}>
            <Text style={styles.buttonText}>Check Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  userIcon: {
    alignSelf: "center",
    marginTop: 32,
  },
  userName: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  orderHeaderText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 6,
  },
  Button: {
    padding: 10,
    backgroundColor: "black",
    color: "white",
    width: 140,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  orderRefContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 16,
  },
  orderRefText: {
    fontSize: 21,
    alignSelf: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
  },
});
export default UserProfileScreen;
