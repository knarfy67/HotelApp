import { StatusBar } from "expo-status-bar";
import OnboardingContextProvider from "./context/OnboardingContext";
import ConditionNavigation from "./navigation/ConditionNavigation";
import "./global.css";

export default function App() {
  return (
    <>
      <OnboardingContextProvider>
        <ConditionNavigation />
      </OnboardingContextProvider>
    </>
  );
}
