import { View, Image, Text } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HotelsVeticalRendered({ item, index }) {
  return (
    <View className="flex flex-row justify-between items-center bg-slate-50 dark:bg-slate-900 my-1 p-2 rounded-lg mx-6">
      <View className="flex flex-row gap-4 ">
        <Image
          className="rounded-lg"
          source={item.image}
          style={{ width: 80, height: 80 }}
        />
        <View>
          <Text className="text-lg font-bold text-gray-600 dark:text-white">
            {item.Header}
          </Text>
          <Text className="text-xs font-light text-gray-500 dark:text-gray-400">
            Malaybalay, Bukidnon
          </Text>
          <Text className="text-md font-medium text-gray-700 dark:text-white">
            {item.price}
            <Text className="font-thin text-sm dark:text-white">
              /per night
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-xs font-light mt-7 mr-2 text-gray-700">
          <AntDesign name="star" size={10} color="gold" />
          <Text className="dark:text-white">4.67</Text>
        </Text>
      </View>
    </View>
  );
}
