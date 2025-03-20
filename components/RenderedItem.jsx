import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  FadeInUp,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const RenderedItem = ({ item, index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lottieAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          x.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [200, 0, 200],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={{
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_WIDTH * 0.9,
          }}
          autoPlay
          loop
        />
      </Animated.View>
      <Animated.View style={lottieAnimationStyle}>
        <Text className="text-sky-950" style={styles.itemText}>
          {item.text}
        </Text>
        <Text className="text-gray-500" style={styles.itemDescription}>
          {item.description}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default RenderedItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  itemText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemDescription: {
    textAlign: "center",
    fontSize: 16,
    marginTop: -10,
    paddingHorizontal: 25,
  },
});
