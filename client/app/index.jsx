import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
// import * as Font from "expo-font";


const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.push("/(tabs)/gym"); // 이미 로그인 상태면 Gym 페이지로 이동
      }
      // router.push("/(tabs)/gym") // login 없이
    };

    checkAuth();
  }, []);

  // const loadFonts = async () => {
  //   await Font.loadAsync({
  //     "CustomFont": require("../assets/fonts/design-design-700.ttf"), // 폰트 경로
  //   });
  // };
  // loadFonts();
 
  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym RaTs</Text>
      <Text style={styles.subtitle}>Reserve your routine</Text>

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
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    // fontFamily: "CustomFont",
  },
  subtitle: {
    fontSize: 24,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default IndexPage;

