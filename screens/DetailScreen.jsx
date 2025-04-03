import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { OnboardingContext } from "../context/OnboardingContext";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FlipInXDown,
  FadeIn,
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MapView, { Marker, Callout } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import details from "../data/hotels";
import DetailsItem from "../components/DetailsItem";
import Pagination from "../components/Pagination";

export default function DetailScreen({ route }) {
  const { colorScheme, mapDark, favorites, setFavorites } =
    useContext(OnboardingContext);
  const navigation = useNavigation();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { item } = route.params;
  const x = useSharedValue(0);
  const [heart, setHeart] = useState(isFavorite);
  const [mapRegion, setmapRegion] = useState({
    latitude: 8.4835138,
    longitude: 124.6507083,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const isFavorite = favorites.includes(item.id);

  const onScroll = useAnimatedScrollHandler((event) => {
    x.value = event.contentOffset.x;
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav !== item.id));
    } else {
      setFavorites([...favorites, item.id]);
    }
  };

  const darkMode = colorScheme === "dark" ? mapDark : [];
  return (
    <View className="flex-1 relative dark:bg-slate-800">
      <View className="absolute top-12 left-5 right-5 z-10 flex flex-row justify-between items-center">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-white p-2 rounded-xl"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <TouchableOpacity
          onPress={toggleFavorite}
          className="bg-white p-2 rounded-xl"
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
      </View>
      {/* <Animated.Image
        sharedTransitionTag={`image-${item.id}`}
        className="rounded-xl"
        source={item.image}
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
      /> */}
      <View className="relative ">
        <Animated.FlatList
          scrollEventThrottle={16}
          data={details}
          onScroll={onScroll}
          renderItem={({ item, index }) => (
            <DetailsItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <Pagination data={details} x={x} />
        </View>
      </View>

      <ScrollView
        vertical
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4">
          <Animated.View
            entering={FadeInDown.delay(300).duration(300)}
            className="flex flex-row justify-between items-center mt-2"
          >
            <Text className="font-bold text-gray-700 dark:text-white text-2xl">
              {item.Header}
            </Text>
            <Text className="text-md font-light text-gray-700 dark:text-white">
              <AntDesign name="star" size={14} color="gold" />
              {item.rate}
            </Text>
          </Animated.View>
          <Animated.Text
            entering={FadeInDown.delay(300).duration(300)}
            className="text-xs font-light text-gray-700 mb-2 dark:text-gray-400"
          >
            Pabayo Hace, Cagayan De Oro City
          </Animated.Text>
          {/* <Animated.View
            entering={FadeIn.delay(600).duration(300)}
            className=" mt-3 rounded-lg overflow-hidden shadow-lg"
          >
            <MapView
              customMapStyle={darkMode}
              style={{ width: "100%", height: 100 }} // Increased height
              region={mapRegion}
            >
              <Marker coordinate={mapRegion} title="Alming Guest House">
                <Image
                  source={require("../assets/img/location.png")}
                  style={{ width: 40, height: 40 }}
                />
              </Marker>
            </MapView>
          </Animated.View> */}

          <Animated.Text
            entering={FadeInDown.delay(300).duration(400)}
            className="text-md font-bold text-gray-700 mt-4 border-t-2 border-t-gray-300  pt-4 dark:text-gray-300"
          >
            Details
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(300).duration(500)}
            className="text-sm  text-gray-500 mt-1"
          >
            {item.person}
          </Animated.Text>
          <Animated.ScrollView
            entering={FadeInRight.delay(300).duration(500)}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            className="mt-2"
          >
            <View className="flex flex-row gap-2 mt-2 mb-1">
              <View className="flex flex-col gap-1 px-10 py-4 bg-slate-50 dark:bg-slate-900 rounded-lg items-center shadow-lg">
                <AntDesign
                  name="wifi"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="dark:text-gray-400">Wifi</Text>
              </View>
              <View className="flex flex-col items-center px-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-lg">
                <FontAwesome
                  name="tv"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="dark:text-gray-400">Smart Tv</Text>
              </View>
              <View className="flex flex-col px-6 py-4 bg-slate-50 rounded-lg dark:bg-slate-900 items-center shadow-lg">
                <MaterialCommunityIcons
                  name="food-takeout-box-outline"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="dark:text-gray-400">Dinner</Text>
              </View>
              <View className="flex flex-col px-6 py-4 bg-slate-50 rounded-lg dark:bg-slate-900 items-center shadow-lg">
                <MaterialCommunityIcons
                  name="parking"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="dark:text-gray-400">Parking</Text>
              </View>
            </View>
          </Animated.ScrollView>
          <Animated.View
            entering={FadeInDown.delay(300).duration(600)}
            className="mt-2 p-2 border-b-2 border-b-gray-300"
          >
            <Text className="font-medium text-gray-500">
              {item.description}
            </Text>
          </Animated.View>
        </View>
        <View className="flex mx-4 mt-2">
          <Text className="font-medium text-2xl text-gray-800 dark:text-gray-300">
            Reviews
          </Text>
          <View className="bg-slate-50 dark:bg-slate-900 p-2 pb-4 my-2 rounded-md">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center gap-2 mt-3">
                <Image
                  className="rounded-full"
                  source={require("../assets/img/Avatar.jpg")}
                  style={{ width: 40, height: 40 }}
                />
                <View>
                  <Text className="font-medium text-lg text-gray-800 dark:text-gray-400">
                    Jhon Doe
                  </Text>
                  <Text className="font-light text-xs text-gray-700 dark:text-gray-400">
                    2024-12-24
                  </Text>
                </View>
              </View>
              <View className="flex flex-row">
                <AntDesign name="star" size={16} color="gold" />
                <AntDesign name="star" size={16} color="gold" />
                <AntDesign name="star" size={16} color="gold" />
                <AntDesign name="star" size={16} color="gold" />
                <AntDesign name="star" size={16} color="gray" />
              </View>
            </View>
            <Text className="mx-2 mt-2 text-gray-600 dark:text-gray-300">
              This hotel exceeded all my expectations. From the breathtaking
              views to the delicious breakfast, every moment was delightful.
            </Text>
          </View>
        </View>
        <View className="flex flex-row mx-6 items-center gap-2">
          <Image
            className="rounded-full"
            source={require("../assets/img/Avatar.jpg")}
            style={{ width: 40, height: 40 }}
          />
          <TextInput
            className="p-3 w-1/6 border-slate-800 border dark:border-gray-300 rounded-lg mt-2 flex-1"
            placeholder="Write a comment"
            placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
          />
        </View>
      </ScrollView>
      {/* button in the ubos */}
      <Animated.View
        className="py-2"
        entering={FlipInXDown.delay(300).duration(400)}
      >
        <LinearGradient
          style={{ borderRadius: 10 }}
          className="flex sticky flex-row justify-between mx-4 py-4 px-6 items-center"
          colors={["#fadb9d", "#d5b675"]}
        >
          <Text className="font-light text-xl text-black">
            {item.price}
            <Text className="font-thin text-sm text-black">/per night</Text>
          </Text>
          <TouchableOpacity className="p-2 px-6 bg-white rounded-md">
            <Text className="font-semibold">Book Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
