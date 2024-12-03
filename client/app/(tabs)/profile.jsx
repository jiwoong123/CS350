import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // AsyncStorage에서 토큰 삭제
      await AsyncStorage.removeItem("authToken");
      Alert.alert("Logged Out", "You have been logged out successfully.");

      // 로그인 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Welcome to your profile page!</Text>

      <Button title="Logout" onPress={handleLogout} color="#ff5c5c" />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
});

export default ProfileScreen;
