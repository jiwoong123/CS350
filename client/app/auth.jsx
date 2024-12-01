import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { apiRequest, setCookie, storeData } from "@/lib/apiRequest.jsx";
import { useRouter } from "expo-router";

const LoginScreen = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // 기존 오류 초기화
    if (!userId || !password) {
      Alert.alert("Error", "Please enter both userId and password");
      return;
    }

    setLoading(true); // 로딩 상태 활성화

    try {
      // 서버에 로그인 요청
      const response = await apiRequest.post("/auth/login", { userId, password });
      Alert.alert("Success", "You are now logged in");
      const [cookie] = response.headers["set-cookie"];
      setCookie(JSON.stringify(cookie));
      await storeData("cookie", JSON.stringify(cookie));

      router.push("/(tabs)/gym");
    } catch (err) {
      console.error("Login error:", err);

      setError(err.response.data.message);
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

export default LoginScreen;
