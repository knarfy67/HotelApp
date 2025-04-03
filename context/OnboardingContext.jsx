import { View, Text, Switch, Modal } from "react-native";
import React, { createContext, useState } from "react";
import { useColorScheme } from "nativewind";

export const OnboardingContext = createContext();

const OnboardingContextProvider = ({ children }) => {
  // diri gikan ang tanan functions sa lain the coponents
  const [account, setAccount] = useState([]);
  const [login, setLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [onboarding, setOnboarding] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // kani and pag darkmode
  const handleToggle = () => {
    toggleColorScheme();
  };

  // kani ang login check mo tonga ang modal if wla ka kog in
  const loginCheck = (navigation) => {
    if (login) {
      navigation.navigate("Checkout");
    } else {
      setShowLoginModal(true);
    }
  };

  // mao ni ang pag darkmode sa mapa
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
        loginCheck,
        showLoginModal,
        setShowLoginModal,
        setAccount,
        account,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContextProvider;
