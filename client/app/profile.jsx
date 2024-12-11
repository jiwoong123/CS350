import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const router = useRouter();
  const username = "John Doe";
  const userID = "John";
  const password = "••••";
  const gymJoinDate = "2023-01-10";

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
      <View style={styles.header}>
        <Ionicons name="person-circle" size={40} color="gray" style={styles.profileIcon} />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out" size={24} color="#ff6347" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.info}>{userID}</Text>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.info}>{password}</Text>
        <Text style={styles.label}>Gym RaTs Join Date:</Text>
        <Text style={styles.info}>{gymJoinDate}</Text>
      </View>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="list" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Registered Gyms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="clipboard" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Equipment Reservation History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="create" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="globe" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Location: Daejeon, South Korea</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="language" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Language: English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="notifications" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Notifications: On</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="settings-sharp" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="information-circle" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  profileIcon: {
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logoutIcon: {
    marginRight: 5,
  },
  logoutText: {
    fontSize: 16,
    color: "#ff6347",
  },
  infoContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#eaeaea",
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
