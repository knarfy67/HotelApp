import React, { useRef } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";
import authData from "../data/auth";
import AuthRendered from "../components/AuthRendered";

export default function LoginScreen({ navigation }) {
  const y = useSharedValue(0);
  const flatListRef = useAnimatedRef();

  const onScroll = useAnimatedScrollHandler((event) => {
    y.value = event.contentOffset.y;
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        data={authData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <AuthRendered
            item={item}
            index={index}
            y={y}
            flatListRef={flatListRef}
          />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}
