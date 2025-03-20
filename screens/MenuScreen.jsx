import { View, Text, Switch } from "react-native";
import React, { useContext } from "react";
import { OnboardingContext } from "../context/OnboardingContext";

export default function MenuScreen() {
  const { colorScheme, handleToggle } = useContext(OnboardingContext);

  return (
    <View className="flex-1 mt-20">
      <Text>MenuScreen</Text>
      <Switch value={colorScheme === "dark"} onValueChange={handleToggle} />
    </View>
  );
}
