import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { Provider } from "react-redux";
import store from "./redux/storeSlice";
import CartScreen from "./screens/CartScreen";
import { StripeProvider } from "@stripe/stripe-react-native";
import AddressScreen from "./screens/AddressScreen";
import TrackOrderScreen from "./screens/TrackOrderScreen";

const Stack = createNativeStackNavigator();
const STRIPE_KEY =
  "pk_test_51NX5CjSJexbD8scVPkjlVm2yOC84x0Nd5W38DG3fMHXJGAl6ZT7tos1s35XDW8QqyU0OeZ2TGDnaFj07JaZ3oGDx00QKW7UJxO";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="HomeScreen" component={HomeScreen} />

              <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
              />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="AddressScreen" component={AddressScreen} />
              <Stack.Screen
                name="TrackOrderScreen"
                component={TrackOrderScreen}
                options={{ presentation: "modal" }}
              />
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
