import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.push("/(tabs)/gym"); // 이미 로그인 상태면 Gym 페이지로 이동
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Gym Reservation App</Text>
      <Text style={styles.subtitle}>Your go-to app for managing gym equipment reservations.</Text>

      <Button title="Login" onPress={handleLogin} color="#6200ea" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default IndexPage;
