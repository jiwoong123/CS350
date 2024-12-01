import axios from "axios";

export const apiRequest = axios.create({
  // baseURL: "http://localhost:8800/api",
  baseURL: "http://10.0.2.2:8800/api", // 안드로이드 에뮬레이터
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const setCookie = (cookie) => {
  apiRequest.defaults.headers.Cookies = JSON.parse(cookie);
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
