import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import products from "../data/products";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import SearchIcon from "react-native-vector-icons/AntDesign";
import logo from "../assets/download.png";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = (product) => {
    navigation.navigate("ProductDetailScreen", { product });
  };
  return (
    <SafeAreaView>
      {/* Navbar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SearchIcon
          name="search1"
          size={22}
          color="#000"
          style={{ marginLeft: 6 }}
        />

        <Image source={logo} style={{ height: 50, width: 130 }} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 10,
            gap: 10,
          }}
        >
          <Icon name="bag" size={22} color="#000" />
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: "50%",
              padding: 1,
              borderRadius: 20,
              margin: 3,
            }}
          >
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>
                  $ {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 2,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default HomeScreen;
