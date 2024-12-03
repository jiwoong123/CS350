import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { apiRequest, apiURL } from "@/lib/apiRequest.jsx";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import CookieManager from "@react-native-cookies/cookies";

const LoginScreen = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 이미 로그인된 경우를 처리
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const cookies = await AsyncStorage.getItem("authToken");
        if (cookies) {
          router.push("/(tabs)/gym"); // 로그인된 상태라면 이동
        }
      } catch (err) {
        console.error("Error checking login status:", err);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!userId || !password) {
      Alert.alert("Error", "Please enter both userId and password");
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest.post("/auth/login", { userId, password });

      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);

      // const setCookieHeader = response.headers["set-cookie"];
      // if (setCookieHeader) {
      //   await CookieManager.set(apiURL, {
      //     name: "authToken",
      //     value: setCookieHeader,
      //     domain: apiURL,
      //     path: "/",
      //     secure: true,
      //     httpOnly: true,
      //   });
      // }

      router.push("/(tabs)/gym"); // 성공 시 이동
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none" // 입력 자동 대문자 방지
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // 비밀번호 입력
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading} // 로딩 중 버튼 비활성화
      />

      {/* 오류 메시지 표시 */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
});
