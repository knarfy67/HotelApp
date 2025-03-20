import { useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import hotels from "../data/hotels";
import HotelsRendered from "../components/HotelsRendered";
import HotelsVeticalRendered from "../components/HotelsVeticalRendered";
import { OnboardingContext } from "../context/OnboardingContext";
import { LinearGradient } from "expo-linear-gradient";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { colorScheme } = useContext(OnboardingContext);

  return (
    <View className="flex-1 relative pt-12 dark:bg-slate-800">
      <FlatList
        className="mb-20"
        data={hotels}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            {/* Top elements */}
            <Animated.View
              entering={FadeInDown.delay(900).duration(600)}
              className="flex flex-row justify-between items-center mx-6"
            >
              <View className="flex gap-1">
                <View className="flex flex-row items-center ">
                  <Text className="font-thin dark:text-white ">Location</Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Ionicons
                    name="compass"
                    size={16}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                  <Text className="font-semibold text-gray-700 dark:text-white">
                    Opol, Misamis Oriental
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  className="rounded-full"
                  source={require("../assets/img/Avatar.jpg")}
                  style={{ width: 40, height: 40 }}
                />
              </View>
            </Animated.View>

            {/* Search and settings */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              className="mx-6"
            >
              <Animated.View
                entering={FadeInDown.delay(900).duration(400)}
                className="flex flex-row  items-center justify-between w-full mt-6 gap-2"
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
                  placeholder="Search for ideal Hotel"
                  placeholderTextColor={
                    colorScheme === "dark" ? "gray" : "gray"
                  }
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

            <Animated.View
              entering={FadeInRight.delay(300).duration(500)}
              className="mb-2 mt-2 ml-6"
            >
              <Text className="font-bold text-2xl my-2 text-gray-700 dark:text-white">
                Categories
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
              >
                <View className="flex flex-row gap-2">
                  <View className="flex flex-row gap-2 items-center border-slate-600 dark:border-slate-500 border rounded-md p-1 px-3">
                    <MaterialCommunityIcons
                      name="pool"
                      size={12}
                      color={colorScheme === "dark" ? "white" : "black"}
                    />
                    <Text className="dark:text-white">Resort</Text>
                  </View>
                  <View className="flex flex-row gap-2 items-center border-slate-600 border dark:border-slate-500 rounded-md p-1 px-3">
                    <FontAwesome5
                      name="umbrella-beach"
                      size={12}
                      color={colorScheme === "dark" ? "white" : "black"}
                    />
                    <Text className="dark:text-white">Beach</Text>
                  </View>
                  <View className="flex flex-row gap-2 items-center border-slate-600 border dark:border-slate-500 rounded-md p-1 px-3">
                    <FontAwesome5
                      name="city"
                      size={12}
                      color={colorScheme === "dark" ? "white" : "black"}
                    />
                    <Text className="dark:text-white">City</Text>
                  </View>
                  <View className="flex flex-row gap-2 items-center border-slate-600 border dark:border-slate-500 rounded-md p-1 px-3">
                    <Foundation
                      name="mountains"
                      size={12}
                      color={colorScheme === "dark" ? "white" : "black"}
                    />
                    <Text className="dark:text-white">Province</Text>
                  </View>
                  <View className="flex flex-row gap-2 items-center border-slate-600 border dark:border-slate-500 rounded-md p-1 px-3">
                    <Foundation
                      name="heart"
                      size={12}
                      color={colorScheme === "dark" ? "white" : "black"}
                    />
                    <Text className="dark:text-white">Joylab forever</Text>
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
            {/* Discount box */}

            <View className="mx-6 overflow-hidden">
              <Animated.View entering={FadeInDown.delay(900).duration(500)}>
                <LinearGradient
                  style={{
                    padding: 16,
                    marginTop: 16,
                    borderRadius: 12,
                  }}
                  colors={["#fadb9d", "#d5b675"]}
                >
                  <View className="flex flex-row justify-between items-center">
                    <View>
                      <View className="mb-2">
                        <Text className="text-white font-bold text-3xl">
                          Love is in the Air
                        </Text>
                        <Text className="text-white font-bold text-2xl">
                          So Are the Savings!
                        </Text>
                      </View>
                      <View>
                        <Text className="text-white">
                          Cozy up with your special
                        </Text>
                        <Text className="text-white">
                          someone and enjoy 50% OFF
                        </Text>
                        <Text className="text-white">for couples!</Text>
                      </View>
                      <Text className="p-2 bg-white text-center font-bold w-1/2 mt-5 rounded-md">
                        Book Now!
                      </Text>
                    </View>
                    <View className="absolute right-[-95]">
                      <LottieView
                        source={require("../assets/animation/RentHome.json")}
                        style={{ width: 200, height: 200 }}
                        autoPlay
                        loop
                      />
                    </View>
                  </View>
                </LinearGradient>
              </Animated.View>
            </View>

            {/* Popular Hotels */}
            <Animated.View
              entering={FadeInDown.delay(900).duration(400)}
              className="flex flex-row justify-between items-center mt-6 mx-6"
            >
              <Text className="font-bold text-gray-700 dark:text-white text-xl">
                Popular Hotels
              </Text>
              <Text className="text-md text-sky-600">See more</Text>
            </Animated.View>

            <Animated.View
              className="ml-6"
              entering={FadeInDown.delay(900).duration(400)}
            >
              <FlatList
                data={hotels}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <HotelsRendered item={item} index={index} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
              />
            </Animated.View>

            {/* Discover Places */}
            <Animated.View
              entering={FadeInDown.delay(900).duration(500)}
              className="flex flex-row justify-between items-center mt-6 mx-6 mb-1 "
            >
              <Text className="font-bold text-gray-700 text-xl dark:text-white ">
                Discover Places
              </Text>
              <Text className="text-md text-sky-600">See more</Text>
            </Animated.View>
          </>
        }
        renderItem={({ item, index }) => (
          <HotelsVeticalRendered item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 200,
  },
});
