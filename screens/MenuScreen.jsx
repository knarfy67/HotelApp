import { View, Text, Switch, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { OnboardingContext } from "../context/OnboardingContext";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function MenuScreen() {
  const { colorScheme, handleToggle } = useContext(OnboardingContext);
  const navigation = useNavigation();
  const iconColor = colorScheme === "dark" ? "white" : "black";

  return (
    <View className={`flex-1 pt-20 dark:bg-slate-900`}>
      {/* User Profile */}
      <View className="items-center">
        <Image
          className="rounded-full"
          source={require("../assets/img/Avatar.jpg")}
          style={{ width: 100, height: 100 }}
        />
        <Text className={`text-2xl text-gray-700 dark:text-white`}>
          Jhon Doe
        </Text>
        <LinearGradient
          className="p-2 px-6 flex flex-row items-center gap-2 mt-2"
          style={{ borderRadius: 8 }}
          colors={["#fadb9d", "#d5b675"]}
        >
          <Feather name="check-circle" size={16} color="green" />
          <Text className="text-md font-light text-gray-700">Cute Member</Text>
        </LinearGradient>
      </View>

      {/* Menu List */}
      <View className="mt-8 bg-slate-50 mx-4 rounded-xl p-4 dark:bg-slate-800">
        <TouchableOpacity
          className="flex flex-row items-center gap-3 mb-4"
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-sharp" size={32} color={iconColor} />
          <Text className="font-light dark:text-white">
            Personal Information
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row items-center gap-3 mb-4"
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-sharp" size={32} color={iconColor} />
          <Text className="font-light dark:text-white">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row items-center gap-3 mb-4"
          onPress={() => navigation.navigate("Privacy")}
        >
          <Ionicons name="lock-closed" size={30} color={iconColor} />
          <Text className="font-light dark:text-white">Privacy & Security</Text>
        </TouchableOpacity>

        {/* Dark Mode Toggle */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-3 mb-4">
            <Ionicons name="moon" size={32} color={iconColor} />
            <Text className="font-light dark:text-white">Dark Mode</Text>
          </View>
          <Switch value={colorScheme === "dark"} onValueChange={handleToggle} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="flex flex-row items-center gap-3 "
          onPress={() => console.log("Logging out...")}
        >
          <Ionicons name="log-out" size={32} color="red" />
          <Text className="font-light text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
