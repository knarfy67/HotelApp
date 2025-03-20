import {
  View,
  Text,
  useWindowDimensions,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  FadeInUp,
} from "react-native-reanimated";

const DetailsItem = ({ item }) => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  return (
    <View className="flex-1 ">
      <Image
        className="rounded-xl"
        source={item.image}
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
      />
    </View>
  );
};

export default DetailsItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
