import React, { useContext } from "react";
import { OnboardingContext } from "../context/OnboardingContext";
import AuthNavigation from "./AuthNavigation";
import GuestNavigation from "./GuestNavigation";
import { StatusBar } from "expo-status-bar";

export default function ConditionNavigation() {
  const { login, colorScheme } = useContext(OnboardingContext);

  return (
    <>
      {login ? <GuestNavigation /> : <GuestNavigation />}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}
