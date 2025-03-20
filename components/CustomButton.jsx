import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { OnboardingContext } from "../context/OnboardingContext";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({ flatListRef, flatListIndex, dataLength, x }) => {
  const { setOnboarding } = useContext(OnboardingContext);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation = useNavigation();

  const getStarted = () => {
    navigation.navigate("NavHome");
    setOnboarding(false);
  };

  const buttonAnimationStyle = useAnimatedStyle(() => ({
    width:
      flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
    height: 60,
  }));

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    width: 30,
    height: 30,
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1
            ? withTiming(100)
            : withTiming(0),
      },
    ],
  }));

  const textAnimationStyle = useAnimatedStyle(() => ({
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1
            ? withTiming(0)
            : withTiming(-100),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          getStarted();
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <LinearGradient
          colors={["#fadb9d", "#d5b675"]}
          style={StyleSheet.absoluteFill}
        />
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require("../assets/ArrowIcon.png")}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: { color: "white", fontSize: 16, position: "absolute" },
});
