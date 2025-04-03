import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingContext } from "../context/OnboardingContext";
import { useNavigation } from "@react-navigation/native";

export default function AuthRendered({ item, index, y, flatListRef }) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const { account, setAccount, setLogin, colorScheme } =
    useContext(OnboardingContext);

  // States for email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigation = useNavigation();

  const scrollAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(
              y.value,
              [
                (index - 1) * SCREEN_HEIGHT,
                index * SCREEN_HEIGHT,
                (index + 1) * SCREEN_HEIGHT,
              ],
              [100, 0, -100],
              Extrapolation.CLAMP
            ),
            {
              damping: 10,
              stiffness: 80,
              mass: 1,
            }
          ),
        },
      ],
    };
  });

  const handleSignUp = () => {
    if (!email || !password || !rePassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== rePassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const newAccount = {
      id: Date.now(),
      email,
      password,
    };

    setAccount((prev) => [...prev, newAccount]);
    setEmail("");
    setPassword("");
    setRePassword("");
    Alert.alert("Success", "Account registered successfully!");
    flatListRef.current?.scrollToIndex({ index: 0 });
  };

  const handleSignIn = () => {
    console.log(account);
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required!");
      return;
    }

    if (!account || !Array.isArray(account)) {
      Alert.alert("Error", "User data is not available!");
      return;
    }

    const user = account.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (user) {
      setLogin(true);
      Alert.alert("Success", "Sign in successful!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Invalid email or password!");
    }
  };

  return (
    <Animated.View
      className="dark:bg-slate-900 bg-white"
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[scrollAnimation, { width: "80%", alignItems: "center" }]}
      >
        <Image
          className="mb-2"
          source={require("../assets/Hotel.png")}
          style={{ width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 2 }}
        />
        <Text
          className="dark:text-white"
          style={{ fontSize: 24, fontWeight: "bold" }}
        >
          {item.headerText}
        </Text>
        <Text
          className="dark:text-white"
          style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}
        >
          {item.description}
        </Text>

        {/* Email input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
          className="dark:text-white"
          style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 20,
          }}
        />

        {/* Password input */}
        <TextInput
          placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="dark:text-white"
          style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 15,
          }}
        />

        {/* Re-enter password for registration page */}
        {item.id === 2 && (
          <TextInput
            placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
            placeholder="Re-enter Password"
            value={rePassword}
            onChangeText={setRePassword}
            secureTextEntry
            style={{
              width: "100%",
              height: 50,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginTop: 15,
            }}
          />
        )}

        {/* Sign In Button */}
        {item.id === 1 && (
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#007bff",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#fadb9d", "#d5b675"]}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        )}

        {/* Register Navigation */}
        {item.id === 1 && (
          <TouchableOpacity
            onPress={() => flatListRef.current?.scrollToIndex({ index: 1 })}
            style={{
              marginTop: 15,
            }}
          >
            <Text style={{ color: "#007bff", fontSize: 16 }}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        )}

        {/* Sign Up Button */}
        {item.id === 2 && (
          <TouchableOpacity
            onPress={handleSignUp}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#007bff",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <LinearGradient
              colors={["#fadb9d", "#d5b675"]}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 10,
              }}
            />
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        )}

        {/* Back to Sign In */}
        {item.id === 2 && (
          <TouchableOpacity
            onPress={() => flatListRef.current?.scrollToIndex({ index: 0 })}
            style={{
              marginTop: 15,
            }}
          >
            <Text style={{ color: "#007bff", fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Animated.View>
  );
}
