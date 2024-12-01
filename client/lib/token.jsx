import apiRequest from "./apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setToken = async (userId, password) => {
  try {
    const response = await apiRequest.post("/auth/login", {
      userId,
      password,
    });
    console.log(response.json());
    const data = await response.json();
    const token = data.token;

    await AsyncStorage.setItem("token", token);

    console.log("Login successful, token stored");
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const getToken = async () => {
  if (typeof window !== "undefined") {
    const token = await AsyncStorage.getItem("authToken");
    console.log(token);
    return token;
  }
  return null;
};
