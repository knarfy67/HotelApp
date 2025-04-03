import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingContext } from "../context/OnboardingContext";

// icons
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HotelsRendered({ item, index }) {
  const navigation = useNavigation();
  const { favorites, setFavorites } = useContext(OnboardingContext);

  const isFavorite = favorites.includes(item.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav !== item.id));
    } else {
      setFavorites([...favorites, item.id]);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("HomeDetails", { item })}
      className="relative bg-slate-50 dark:bg-slate-900 dark:shadow-slate-950 dark:shadow-lg  rounded-xl pb-5 px-2 pt-2 border-gray-300 mt-3 mr-2"
    >
      <TouchableOpacity
        onPress={toggleFavorite}
        className="absolute top-5 right-5 z-10 bg-white p-2 rounded-xl"
      >
        {isFavorite ? (
          <Image
            className="size-7"
            source={require("../assets/img/heart.png")}
          />
        ) : (
          <AntDesign name="hearto" size={24} color="black" />
        )}
      </TouchableOpacity>

      <Animated.Image
        sharedTransitionTag={`image-${item.id}`}
        className="rounded-lg"
        source={item.image}
        style={{ width: 280, height: 210 }}
      />

      <View className="mx-2">
        <View className="flex flex-row justify-between items-center mt-3">
          <Text className="text-lg font-bold text-gray-700 dark:text-white">
            {item.Header}
          </Text>
          <Text className="text-md font-light text-gray-700 dark:text-white">
            <AntDesign name="star" size={14} color="gold" />
            {item.rate}
          </Text>
        </View>
        <View>
          <Text className="text-sm  text-gray-500 mt-1 dark:text-gray-400">
            {item.person}
          </Text>
          <Text className="text-xl font-bold  text-gray-700 dark:text-white">
            {item.price}
            <Text className="font-thin text-sm dark:text-white">
              /per night
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
