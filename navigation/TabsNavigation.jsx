import { View, Text, Keyboard } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInUp,
  BounceInDown,
  FlipOutYRight,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
// Screens
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Tab = createBottomTabNavigator();

const LottieIcon = ({ animationData, focused }) => {
  const lottieRef = useRef(null);

  if (lottieRef.current) {
    focused ? lottieRef.current.play() : lottieRef.current.reset();
  }

  return (
    <LottieView
      ref={lottieRef}
      style={{ width: 30, height: 30, opacity: focused ? 1 : 0.3 }}
      source={animationData}
      loop={false}
    />
  );
};

export default function TabsNavigation() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        animation: "fade",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          right: 10,
          left: 10,
          height: 60,
          borderRadius: 10,
          marginHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 10,
          display: isKeyboardVisible ? "none" : "flex",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#fadb9d", "#d5b675"]}
            style={{
              flex: 1,
              borderRadius: 10,
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="NavHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <LottieIcon
                animationData={require("../assets/animation/NavHome.json")}
                focused={focused}
              />
              {focused && <Text className="text-[8px] text-sky-950">Home</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NavDetails"
        component={PaymentScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <LottieIcon
                animationData={require("../assets/animation/NavDetails.json")}
                focused={focused}
              />
              {focused && (
                <Text className="text-[8px] text-sky-950">Discover</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NavFavorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <LottieIcon
                animationData={require("../assets/animation/NavHeart.json")}
                focused={focused}
              />
              {focused && (
                <Text className="text-[8px] text-sky-950">Favorite</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NavMenu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <LottieIcon
                animationData={require("../assets/animation/NavMenu.json")}
                focused={focused}
              />
              {focused && <Text className="text-[8px] text-sky-950">Menu</Text>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
