import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import RenderedItem from "../components/RenderedItem";
import Pagination from "../components/Pagination";
import CustomButton from "../components/CustomButton";
import data, { OnboardingData } from "../data/data";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  FadeInUp,
} from "react-native-reanimated";
import { OnboardingContext } from "../context/OnboardingContext";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";

// diri and start sa screen

export default function OnboardingScreen() {
  const flatListRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const { setOnboarding } = useContext(OnboardingContext);
  const navigation = useNavigation();

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler((event) => {
    x.value = event.contentOffset.x;
    {
      // console.log(x);
      // console.log(flatListIndex);
      // console.log(flatListRef);
      // console.log(data.length);
    }
  });

  // sa taaas nga skip button
  const skipOnboarding = () => {
    navigation.navigate("NavHome");
    setOnboarding(false);
  };

  return (
    <Animated.View
      className="flex-1 bg-slate-50 dark:bg-slate-800"
      entering={FadeInUp.delay(200).duration(500)}
    >
      <TouchableOpacity
        onPress={skipOnboarding}
        className="absolute top-[40px] left-5 z-10 p-2"
      >
        <Text className="text-black font-thin text-lg">Skip</Text>
      </TouchableOpacity>

      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderedItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 30,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});
