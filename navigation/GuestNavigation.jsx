import React, { useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingContext } from "../context/OnboardingContext";

// Screens
import OnboardingScreen from "../screens/OnboardingScreen";
import TabsNavigation from "./TabsNavigation";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const PlaceholderScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Coming Soon</Text>
  </View>
);

export default function GuestNavigation() {
  const { onboarding } = useContext(OnboardingContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={onboarding ? "Onboarding" : "NavHome"}>
        {onboarding && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="NavHome"
          component={TabsNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDetails"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
