import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { OnboardingContext } from "../context/OnboardingContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import hotels from "../data/hotels";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

//icons
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";

export default function FavoritesScreen() {
  const { favorites, setFavorites, colorScheme } =
    useContext(OnboardingContext);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation = useNavigation();

  // Ensure newly added favorites appear first
  const favoriteHotels = hotels
    .filter((hotel) => favorites.includes(hotel.id))
    .sort((a, b) => favorites.indexOf(a.id) - favorites.indexOf(b.id))
    .reverse(); // Reverse to keep the newest on top

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav !== id));
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 p-5 pb-24">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="mt-4 mb-2"
      >
        <Animated.View
          entering={FadeInDown.delay(400).duration(400)}
          className="flex flex-row items-center justify-between w-full mt-6 gap-2"
        >
          <View className="absolute left-3 top-3">
            <FontAwesome
              name="search"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </View>
          <TextInput
            className="p-3 pl-11 pr-14 w-full border-slate-800 dark:border-slate-100 border flex-1 rounded-lg"
            placeholder="Search Favorites"
            placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
          />
          <View>
            <LinearGradient
              style={{ borderRadius: 8 }}
              colors={["#fadb9d", "#d5b675"]}
            >
              <Ionicons
                className="p-2.5  rounded-md"
                name="filter"
                size={26}
                color={"black"}
              />
            </LinearGradient>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
      {favoriteHotels.length === 0 ? (
        <Text className="text-gray-500 dark:text-gray-300">
          No favorite hotels yet.
        </Text>
      ) : (
        <FlatList
          overScrollMode="never"
          bounces={false}
          scrollEventThrottle={16}
          data={favoriteHotels}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="relative p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mt-2">
              <View className="flex flex-row gap-2">
                <Image
                  source={item.image}
                  style={{ height: SCREEN_WIDTH / 3, width: "50%" }}
                  className="rounded-lg"
                />
                <View className="mt-2">
                  <Text className="text-lg font-semibold text-gray-700 dark:text-white">
                    {item.Header}
                  </Text>
                  <Text className=" text-gray-700 dark:text-white text-lg font-medium">
                    {item.price}
                    <Text className="dark:text-gray-400 text-sm font-thin">
                      / per night
                    </Text>
                  </Text>
                  <Text className=" text-gray-700 dark:text-white text-xs font-thin">
                    <AntDesign name="star" size={10} color="gold" />
                    {item.rate}
                  </Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("HomeDetails", { item })}
                  >
                    <LinearGradient
                      className="p-3"
                      style={{
                        borderRadius: 8,
                        marginTop: 6,
                        width: SCREEN_WIDTH / 2.5,
                        alignSelf: "center",
                      }}
                      colors={["#fadb9d", "#d5b675"]}
                    >
                      <Text className="text-gray-700 text-center font-sm">
                        View Details
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                className="absolute left-4 bg-white p-2 rounded-lg top-4"
                onPress={() => removeFavorite(item.id)}
              >
                <Image
                  className="size-4"
                  source={require("../assets/img/heart.png")}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
