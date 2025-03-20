import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingContext } from "../context/OnboardingContext";
import hotels from "../data/hotels";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PaymentScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { mapDark, colorScheme } = useContext(OnboardingContext);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mapRegion, setmapRegion] = useState({
    latitude: 8.4835138,
    longitude: 124.6507083,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const darkMode = colorScheme === "dark" ? mapDark : [];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.Header.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 relative">
      <View className="flex flex-col absolute z-10 top-12 w-full">
        <View className="flex flex-row gap-1 items-center mx-4">
          <FontAwesome
            className="absolute z-10 top-5 ml-2 left-1"
            name="search"
            size={22}
            color="black"
          />
          <TextInput
            className="p-3 pl-10 flex-1 border-slate-800 bg-slate-50 border rounded-lg mt-2"
            placeholder="Search Hotel"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setShowDropdown(text.length > 0);
            }}
          />
          <LinearGradient
            className="top-1"
            style={{ borderRadius: 8 }}
            colors={["#fadb9d", "#d5b675"]}
          >
            <Ionicons
              className="top-0 p-2 rounded-m"
              name="filter"
              size={26}
              color="black"
            />
          </LinearGradient>
        </View>
        {showDropdown && (
          <View className="bg-white border mx-4 border-gray-300 rounded-lg mt-1 max-h-40 overflow-hidden">
            <FlatList
              data={filteredHotels}
              keyExtractor={(item) => item.Header}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-200"
                  onPress={() => {
                    setSearchQuery(item.Header);
                    setShowDropdown(false);
                    setSelectedHotel(item);
                    setmapRegion({
                      latitude: item.coordinates.latitude,
                      longitude: item.coordinates.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    });
                  }}
                >
                  <Text className="text-black">{item.Header}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="p-3">
                  <Text className="text-gray-500 text-center">
                    No results found
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
      <View className="rounded-lg overflow-hidden shadow-lg">
        <MapView
          customMapStyle={darkMode}
          style={{ width: SCREEN_WIDTH, height: "100%" }}
          region={mapRegion}
        >
          {filteredHotels.map((hotel, index) => (
            <Marker
              key={index}
              coordinate={hotel.coordinates}
              onPress={() => setSelectedHotel(hotel)}
              title={hotel.Header}
            >
              <Image
                source={require("../assets/img/location.png")}
                style={{
                  width: selectedHotel === hotel ? 40 : 35,
                  height: selectedHotel === hotel ? 40 : 35,
                }}
              />
            </Marker>
          ))}
        </MapView>
      </View>
      {selectedHotel && (
        <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-700 p-4 rounded-t-lg shadow-lg mb-24 mx-4">
          <Image
            source={selectedHotel.image}
            style={{ width: "100%", height: 100, borderRadius: 10 }}
            resizeMode="cover"
          />
          <View className="flex flex-row justify-between items-center">
            <Text className="text-2xl font-bold mt-2 text-gray-700 dark:text-white">
              {selectedHotel.Header}
            </Text>
            <Text className="text-xs font-light dark:text-white top-1">
              <AntDesign name="star" size={12} color="gold" />
              {selectedHotel.rate}
            </Text>
          </View>
          <Text className="text-xs  text-gray-500 mt-1 dark:text-gray-400">
            {selectedHotel.person}
          </Text>
          <Text className="text-xl font-bold  text-gray-700 mt-1 dark:text-white mb-1">
            {selectedHotel.price}
            <Text className="font-thin">/per night</Text>
          </Text>
          <View className="flex flex-row gap-2">
            <LinearGradient
              className="mt-2 flex-1"
              style={{ borderRadius: 8 }}
              colors={["#fadb9d", "#d5b675"]}
            >
              <TouchableOpacity
                className="p-4 rounded-lg"
                onPress={() => setSelectedHotel(null)}
              >
                <Text className="text-black text-center">Book Now</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              className="p-4 rounded-lg mt-2  bg-white dark:bg-slate-700 border-2 border-[#d5b675] "
              onPress={() => setSelectedHotel(null)}
            >
              <Text className="text-black dark:text-white text-center">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
