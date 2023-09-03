import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOrderStatus } from "../apis/orders";
import TrackOrderFooter from "../components/TrackOrderFooter";
import Icon from "react-native-vector-icons/AntDesign";
import SearchIcon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";

const TrackOrderScreen = () => {
  const route = useRoute();
  const orderRefFromUserScreen = route?.params?.orderReference;
  const [orderStatusData, setOrderStatusData] = useState();
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayOrderId, setDisplayOrderId] = useState(false);
  const [showErrorMsg, setshowErrorMsg] = useState(false);
  const [orderRefFromUser, setOrderRefFromUser] = useState(
    orderRefFromUserScreen
  );
  const navigation = useNavigation();

  const fetchOrderStatus = async () => {
    setIsLoading(true);
    const ordersData = await getOrderStatus(
      orderId ? orderId : orderRefFromUser
    );
    if (ordersData) {
      setOrderStatusData(ordersData);
      setDisplayOrderId(true);
      setshowErrorMsg(false);
      setIsLoading(false);
    } else {
      setshowErrorMsg(true);
      setIsLoading(false);
    }
  };

  if (orderRefFromUser) {
    useEffect(() => {
      fetchOrderStatus();
    }, []);
  }

  const itemsArray = orderStatusData?.data?.items || [];

  //For sending to the Footer Component
  const deliveryDetails = orderStatusData?.data;

  const textInputChange = (text) => {
    setOrderId(text);
    setshowErrorMsg(false);
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
      <Text style={styles.yourOrderHeader}>Your Order Status</Text>

      {/* Input Box */}

      <View>
        <TextInput
          placeholder="Enter Order ID"
          onChangeText={textInputChange}
          onSubmitEditing={fetchOrderStatus}
          value={orderId ? orderId : orderRefFromUser}
          returnKeyType="search"
          style={styles.idInput}
        />
        <SearchIcon
          style={styles.seachIcon}
          name="search1"
          size={25}
          color="black"
          onPress={fetchOrderStatus}
        />

        {isLoading && (
          <ActivityIndicator style={styles.loader} size="medium" color="#000" />
        )}
      </View>

      {/* Order Data */}
      {orderStatusData && displayOrderId && (
        <>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdText}>
              Order ID : {orderId ? orderId : orderRefFromUser}
            </Text>
          </View>

          <FlatList
            data={itemsArray}
            style={{ marginBottom: 200 }}
            renderItem={({ item }) => (
              <View
                style={styles.orderDetailsContainer}
                key={item?.newItem?._id}
              >
                <View style={styles.orderItemContainer}>
                  <Image
                    source={{ uri: item?.newItem?.image }}
                    height={110}
                    width={110}
                    style={styles.image}
                  />
                  <View style={styles.orderItemPriceContainer}>
                    <Text style={styles.name}>{item?.newItem?.name}</Text>
                    <Text style={styles.quantity}>Qty : {item?.quantity}</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.price}>${item?.newItem?.price}</Text>
                </View>
              </View>
            )}
            ListFooterComponent={() => (
              <TrackOrderFooter deliveryDetails={deliveryDetails} />
            )}
          />
        </>
      )}
      {showErrorMsg && (
        <View>
          <Text>No Order Found with the entered ID : "{orderId}" </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  yourOrderHeader: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  idInput: {
    padding: 8,
    borderColor: "black",
    borderWidth: 0.7,
    borderRadius: 3,
    width: "90%",
    marginTop: 20,
    marginLeft: 20,
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  seachIcon: {
    alignSelf: "flex-end",
    marginRight: 23,
    marginTop: 28,
    fontWeight: "bold",
  },
  loader: {
    alignSelf: "center",
    top: 100,
  },
  orderIdContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },

  orderDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    margin: 15,
  },
  orderItemContainer: {
    flexDirection: "row",
  },
  orderItemPriceContainer: {
    marginLeft: 5,
  },
  name: {
    fontSize: 25,
    marginTop: -4,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "400",
  },
  orderIdText: {
    margin: 23,
    marginBottom: 6,
    fontSize: 20,
    fontWeight: "600",
  },
  image: {
    borderRadius: 7,
    shadowColor: "black",
    shadowOffset: { width: 100, height: 120 },
    shadowOpacity: 200,
    shadowRadius: 40,
  },
});
export default TrackOrderScreen;
