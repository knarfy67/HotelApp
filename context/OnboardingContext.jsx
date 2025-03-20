import { View, Text, Switch } from "react-native";
import React, { createContext, useState } from "react";
import { useColorScheme } from "nativewind";

export const OnboardingContext = createContext();

const OnboardingContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [onboarding, setOnboarding] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const handleToggle = () => {
    toggleColorScheme();
  };

  const mapDark = [
    {
      elementType: "geometry",
      stylers: [{ color: "#0b1f3a" }], // Deep dark blue background
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#b0c4de" }], // Light blue text for readability
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#0b1f3a" }], // Matches background for smooth appearance
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#3a4a6b" }], // Darker blue for admin boundaries
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#a8b8d8" }], // Light desaturated blue for POI text
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#1e3a5f" }], // Dark navy blue roads
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8fa8c8" }], // Softer blue for road labels
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0a2a52" }], // Dark deep blue water
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b8eba" }], // Light blue for water text
    },
  ];

  return (
    <OnboardingContext.Provider
      value={{
        login,
        setLogin,
        onboarding,
        setOnboarding,
        colorScheme,
        handleToggle,
        mapDark,
        setFavorites,
        favorites,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContextProvider;
